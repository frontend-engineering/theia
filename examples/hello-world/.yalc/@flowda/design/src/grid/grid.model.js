import { __decorate } from "tslib";
import { injectable } from 'inversify';
import { cellRendererInputSchema, getResourceDataOutputInnerSchema, } from '@flowda/types';
import { isUriAsKeyLikeEqual, mergeUriFilterModel, updateUriFilterModel } from '../uri/uri-utils';
import { URI } from '@theia/core';
let GridModel = class GridModel {
    constructor() {
        this.columnDefs = [];
        this.schemaName = null;
        this.schema = null;
        this.isNotEmpty = false;
        this.gridApi = null;
        this.handlers = {};
        this.apis = {};
        this._isFirstGetRows = true;
        this.onMouseEnter = (e) => {
            if (typeof this.handlers.onMouseEnter === 'function') {
                this.handlers.onMouseEnter(e);
            }
        };
        this.onContextMenu = (cellRendererInput, e, options) => {
            if (typeof this.handlers.onContextMenu === 'function') {
                const parsedRet = cellRendererInputSchema.parse(cellRendererInput);
                if (this._uri == null)
                    throw new Error('uri is null');
                if (this.schema == null)
                    throw new Error('schema is null');
                if ((options === null || options === void 0 ? void 0 : options.type) === 'association') {
                    const ass = this.schema.associations.find(ass => ass.model_name === parsedRet.colDef.field);
                    if (!ass)
                        throw new Error(`no association def: ${this.schemaName}, ${parsedRet.colDef.field}`);
                    this.handlers.onContextMenu({
                        uri: this.getUri(),
                        cellRendererInput: parsedRet,
                        association: ass
                    }, e);
                }
                else {
                    const column = this.schema.columns.find(col => col.name === parsedRet.colDef.field);
                    if (!column)
                        throw new Error(`no column def: ${this.schemaName}, ${parsedRet.colDef.field}`);
                    this.handlers.onContextMenu({
                        uri: this.getUri(),
                        cellRendererInput: parsedRet,
                        column
                    }, e);
                }
            }
        };
    }
    get isFirstGetRows() {
        return this._isFirstGetRows;
    }
    getUri() {
        if (!this._uri)
            throw new Error('uri is null');
        return this._uri.toString(true);
    }
    setUri(uri) {
        if (typeof uri === 'string')
            uri = new URI(uri);
        this._uri = uri;
    }
    resetIsFirstGetRows() {
        this._isFirstGetRows = true;
    }
    /**
     * 在 ResourceWidgetFactory#createWidget 重置 promise
     * 因为目前 grid.model 在 tab 关闭并不会销毁 todo 可以销毁 这样流程简单很多
     */
    resetRefPromise(uri) {
        this.setUri(uri);
        this.resetIsFirstGetRows();
        this.refPromise = new Promise((resolve) => {
            this.refResolve = resolve;
        });
    }
    refresh() {
        if (this.gridApi && !this.gridApi.isDestroyed()) {
            this.gridApi.refreshInfiniteCache();
        }
    }
    /**
     * `<Grid ref={ref => this.setRef(ref)} />`
     */
    setRef(ref, uri) {
        this.ref = ref;
        if (uri != null) {
            if (this._uri == null) {
                this.setUri(uri);
            }
            else {
                // double check 下 防止 gridModel grid 未对应
                if (!isUriAsKeyLikeEqual(uri, this._uri))
                    throw new Error(`setRef uri is not matched, current: ${this._uri}, input: ${uri}`);
            }
        }
        this.refResolve(true);
    }
    setSchemaName(schemaName) {
        this.schemaName = schemaName;
    }
    async getCol(schemaName) {
        this.setSchemaName(schemaName);
        if (typeof this.apis.getResourceSchema !== 'function') {
            throw new Error('handlers.getResourceSchema is not implemented');
        }
        if (this.schemaName == null) {
            throw new Error('schemaName is null');
        }
        if (this.columnDefs.length > 0) {
            console.warn(`columns is not empty, only refresh data, ${schemaName}`);
            this.refresh();
        }
        else {
            const schemaRes = await this.apis.getResourceSchema({
                schemaName: this.schemaName,
            });
            if (schemaRes.columns.length > 0) {
                this.columnDefs = schemaRes.columns;
            }
            this.schema = schemaRes;
        }
        if (this.refPromise == null)
            throw new Error('refPromise is null, call resetRefPromise in getOrCreateGridModel()');
        await this.refPromise;
        // @ts-expect-error
        if (this.ref == null || typeof this.ref['setColDefs'] !== 'function') {
            throw new Error('ref is null');
        }
        // @ts-expect-error
        this.ref['setColDefs']();
    }
    async getData(params) {
        var _a;
        if (typeof this.apis.getResourceData !== 'function') {
            throw new Error('apis.getResourceData is not implemented');
        }
        this._isFirstGetRows = false;
        params.filterModel = mergeUriFilterModel(this.getUri(), params.filterModel);
        (_a = this.gridApi) === null || _a === void 0 ? void 0 : _a.setFilterModel(params.filterModel);
        const uri = updateUriFilterModel(this.getUri(), params.filterModel);
        this.setUri(uri);
        const dataRet = await this.apis.getResourceData(params);
        const parseRet = getResourceDataOutputInnerSchema.safeParse(dataRet);
        if (parseRet.success) {
            return parseRet.data;
        }
        return {
            data: [dataRet],
            pagination: { total: 1 },
        };
    }
    async putData(id, updatedValue) {
        if (typeof this.apis.putResourceData != 'function') {
            throw new Error('handlers.putResourceData is not implemented');
        }
        await this.apis.putResourceData({
            schemaName: this.schemaName,
            id: id,
            updatedValue: updatedValue,
        });
    }
    onRefClick(field, value) {
        var _a;
        const ref = (_a = this.schema) === null || _a === void 0 ? void 0 : _a.columns.find(t => t.name === field);
        if (ref == null || ref.reference == null) {
            throw new Error(`field is not type reference, ${field}`);
        }
        if (typeof this.handlers.onRefClick === 'function') {
            this.handlers.onRefClick({
                schemaName: `resource.${this.schema.namespace}.${ref.reference.model_name}ResourceSchema`,
                name: ref.reference.display_name,
                id: value,
            });
        }
    }
};
GridModel = __decorate([
    injectable()
], GridModel);
export { GridModel };
//# sourceMappingURL=grid.model.js.map