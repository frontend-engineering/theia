import { __decorate } from "tslib";
import { injectable } from 'inversify';
import * as _ from 'radash';
import { URI } from '@theia/core';
import { getTreeUriQuery } from '../uri/uri-utils';
import { convertAgTreeDataToTreeData, convertMenuDataToAgTreeData } from './tree-grid-utils';
import { agMenuItemSchema } from '@flowda/types';
let TreeGridModel = class TreeGridModel {
    constructor() {
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
    }
    getUri() {
        if (!this.uri)
            throw new Error('uri is null');
        return this.uri;
    }
    resetGridReadyPromise(uri) {
        this.setUri(uri);
        this.gridReadyPromise = new Promise((resolve) => {
            this.gridReadyResolve = resolve;
        });
    }
    setGridApi(gridApi) {
        this.gridApi = gridApi;
        if (!this.gridReadyResolve)
            throw new Error('gridReadyResolve is null, call resetGridReadyPromise() first');
        this.gridReadyResolve(true);
    }
    setUri(uri) {
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
    async loadData() {
        if (!this.gridModel)
            throw new Error(`this.gridModel is null, call setGridModel() first`);
        if (!this.uri)
            throw new Error(`this.uri is null, call setUri() first`);
        if (typeof this.gridModel.apis.getResourceData !== 'function')
            throw new Error('handlers.getResourceData is not implemented');
        const uri = new URI(this.uri);
        const query = getTreeUriQuery(this.uri);
        // todo: any
        const ret = await this.gridModel.apis.getResourceData({
            schemaName: `${uri.authority}.${query.schemaName}`,
            id: Number(query.id),
        });
        let menuData = ret[query.field];
        if (typeof menuData === 'string') {
            menuData = JSON.parse(ret[query.field]);
        }
        const treeData = convertMenuDataToAgTreeData(menuData);
        if (!this.gridReadyPromise)
            throw new Error('gridReadyPromise is null, call resetGridReadyPromise() first');
        await this.gridReadyPromise;
        if (!this.gridApi)
            throw new Error('gridApi is null');
        this.gridApi.setGridOption('rowData', treeData);
    }
    setGridModel(gridModel) {
        this.gridModel = gridModel;
    }
    getDataPath(data) {
        // @ts-expect-error
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
        if (!this.gridModel)
            throw new Error(`this.gridModel is null, call setGridModel() first`);
        if (typeof this.gridModel.apis.putResourceData !== 'function')
            throw new Error('handlers.putResourceData is not implemented');
        if (!this.uri)
            throw new Error(`this.uri is null, call setUri() first`);
        const uri = new URI(this.uri);
        const query = getTreeUriQuery(this.uri);
        try {
            this.gridModel.apis.putResourceData({
                schemaName: `${uri.authority}.${query.schemaName}`,
                id: Number(query.id),
                updatedValue: {
                    [query.field]: menuData
                }
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
            remove: [
                node.data,
            ],
        });
        this.convertAndSaveMenuData();
    }
};
TreeGridModel = __decorate([
    injectable()
], TreeGridModel);
export { TreeGridModel };
//# sourceMappingURL=tree-grid.model.js.map