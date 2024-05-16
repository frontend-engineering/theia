import { __decorate, __metadata, __param } from "tslib";
import { inject, injectable } from 'inversify';
import * as _ from 'radash';
import { URI } from '@theia/core';
import { getTreeUriQuery } from '../uri/uri-utils';
import { convertAgTreeDataToTreeData, convertMenuDataToAgTreeData } from './tree-grid-utils';
import { agMenuItemSchema, ApiServiceSymbol } from '@flowda/types';
let TreeGridModel = class TreeGridModel {
    constructor(apiService) {
        this.apiService = apiService;
        this.gridApi = null;
        this.columnDefs = [
            { field: 'name', editable: true },
            { field: 'slug', editable: true },
            { field: 'icon', editable: true },
        ];
        this.handlers = {};
        this.handleCellValueChanged = (evt) => {
            if (!this.gridApi)
                throw new Error('gridApi is null');
            this.convertAndSaveMenuData();
        };
        this.gridReadyPromise = new Promise(resolve => {
            this.gridReadyResolve = resolve;
        });
    }
    getUri() {
        if (!this.uri)
            throw new Error('uri is null');
        return this.uri;
    }
    getTenant() {
        if (!this.uri)
            throw new Error('uri is null');
        const uri_ = new URI(this.uri);
        return uri_.authority;
    }
    setGridApi(gridApi) {
        this.gridApi = gridApi;
        this.gridReadyResolve(true);
    }
    setUri(uri) {
        if (typeof uri !== 'string')
            uri = uri.toString(true);
        if (uri != null) {
            if (this.uri == null) {
                this.uri = uri;
            }
            else {
                // double check 下 防止 gridModel grid 未对应
                if (uri !== this.uri)
                    throw new Error(`setRef uri is not matched, current: ${this.uri}, input: ${uri}`);
            }
        }
    }
    async onCurrentEditorChanged() {
        await this.loadData();
    }
    async loadData() {
        if (!this.uri)
            throw new Error(`this.uri is null, call setUri() first`);
        const uri = new URI(this.uri);
        const query = getTreeUriQuery(this.uri);
        // todo: any
        const ret = await this.apiService.getResourceData({
            tenant: this.getTenant(),
            schemaName: `${uri.authority}.${query.schemaName}`,
            id: Number(query.id),
        });
        let menuData = ret[query.field];
        if (typeof menuData === 'string') {
            menuData = JSON.parse(ret[query.field]);
        }
        const treeData = convertMenuDataToAgTreeData(menuData);
        await this.gridReadyPromise;
        if (!this.gridApi)
            throw new Error('gridApi is null');
        this.gridApi.setGridOption('rowData', treeData);
    }
    getDataPath(data) {
        if (!('hierarchy' in data) || !Array.isArray(data.hierarchy)) {
            throw new Error('Must provide hierarchy field.');
        }
        return data.hierarchy;
    }
    convertAndSaveMenuData() {
        if (!this.gridApi)
            throw new Error('gridApi is null');
        const agTreeData = [];
        this.gridApi.forEachNode(node => {
            agTreeData.push(node.data);
        });
        const menuData = convertAgTreeDataToTreeData(agTreeData);
        if (!this.uri)
            throw new Error(`this.uri is null, call setUri() first`);
        const uri = new URI(this.uri);
        const query = getTreeUriQuery(this.uri);
        try {
            this.apiService.putResourceData({
                tenant: this.getTenant(),
                schemaName: `${uri.authority}.${query.schemaName}`,
                id: Number(query.id),
                updatedValue: {
                    [query.field]: menuData,
                },
            });
        }
        catch (e) {
            if (typeof this.handlers.message === 'function') {
                this.handlers.message(`Update failed, try to reload data from backend`);
                this.loadData();
            }
        }
    }
    addChild(id) {
        if (!this.gridApi)
            throw new Error('gridApi is null');
        const newId = _.uid(4);
        let findRet = null;
        this.gridApi.forEachNode(node => {
            if (node.data.id === id)
                findRet = node.data;
        });
        findRet = agMenuItemSchema.parse(findRet);
        if (findRet == null)
            throw new Error(`No row found, ${id}`);
        this.gridApi.applyTransaction({
            add: [
                {
                    hierarchy: [...findRet.hierarchy, String(newId)],
                    id: newId,
                },
            ],
        });
        this.convertAndSaveMenuData();
    }
    addPeer(id) {
        if (!this.gridApi)
            throw new Error('gridApi is null');
        const newId = _.uid(4);
        let findRet = null;
        this.gridApi.forEachNode(node => {
            if (node.data.id === id)
                findRet = node.data;
        });
        findRet = agMenuItemSchema.parse(findRet);
        if (findRet == null)
            throw new Error(`No row found, ${id}`);
        this.gridApi.applyTransaction({
            add: [
                {
                    hierarchy: [...findRet.hierarchy.slice(0, findRet.hierarchy.length - 1), String(newId)],
                    id: newId,
                },
            ],
        });
        this.convertAndSaveMenuData();
    }
    remove(node) {
        if (node == null) {
            console.warn('node is null');
            return;
        }
        if (!this.gridApi)
            throw new Error('gridApi is null');
        let some = false;
        this.gridApi.forEachNode(eachnode => {
            const h = eachnode.data.hierarchy;
            if (h[h.length - 1] !== node.key && h.indexOf(node.key) > -1) {
                some = true;
            }
        });
        if (some) {
            // todo: 对接 theia logger
            console.warn(`Cannot remove whose children is not empty, id:${node.key}`);
            if (typeof this.handlers.message === 'function') {
                this.handlers.message(`Cannot remove whose children is not empty`);
            }
            return;
        }
        this.gridApi.applyTransaction({
            remove: [node.data],
        });
        this.convertAndSaveMenuData();
    }
};
TreeGridModel = __decorate([
    injectable(),
    __param(0, inject(ApiServiceSymbol)),
    __metadata("design:paramtypes", [Object])
], TreeGridModel);
export { TreeGridModel };
//# sourceMappingURL=tree-grid.model.js.map