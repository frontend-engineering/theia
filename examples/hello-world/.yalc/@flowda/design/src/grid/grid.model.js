import { __decorate, __metadata, __param } from "tslib";
import { inject, injectable, multiInject, optional } from 'inversify';
import { ApiServiceSymbol, builtinPluginSchema, cellRendererInputSchema, CustomResourceSymbol, getResourceDataOutputInnerSchema, ThemeModelSymbol, } from '@flowda/types';
import { createNewFormUri, isUriAsKeyLikeEqual, mergeUriFilterModel, updateUriFilterModel } from '../uri/uri-utils';
import { URI } from '@theia/core';
import axios from 'axios';
import { ThemeModel } from '../theme/theme.model';
let GridModel = class GridModel {
    get isFirstGetRows() {
        return this._isFirstGetRows;
    }
    constructor(theme, apiService, customResources) {
        this.theme = theme;
        this.apiService = apiService;
        this.customResources = customResources;
        this.columnDefs = [];
        this.schemaName = null;
        this.schema = null;
        this.isNotEmpty = false;
        this.gridApi = null;
        this.schemaReadyPromise = new Promise(resolve => {
            this.schemaReadyResolve = resolve;
        });
        // todo: extract to a interface
        this.handlers = {};
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
                        association: ass,
                    }, e);
                }
                else {
                    const column = this.schema.columns.find(col => col.name === parsedRet.colDef.field);
                    if (!column)
                        throw new Error(`no column def: ${this.schemaName}, ${parsedRet.colDef.field}`);
                    this.handlers.onContextMenu({
                        uri: this.getUri(),
                        cellRendererInput: parsedRet,
                        column,
                    }, e);
                }
            }
        };
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
    resetGridReadyPromise(uri) {
        this.setUri(uri);
        this.resetIsFirstGetRows();
        this.refPromise = new Promise(resolve => {
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
    getCustomResource() {
        if (this.schemaName == null) {
            throw new Error('schemaName is null');
        }
        return (this.customResources || []).find(i => i.schemaName === this.schemaName);
    }
    getCustomCellRenderer(colName) {
        if (this.schemaName == null) {
            throw new Error('schemaName is null');
        }
        const customResource = (this.customResources || []).find(i => i.schemaName === this.schemaName);
        if (customResource == null)
            return;
        return customResource.getCellRenderer(colName);
    }
    async getCol(schemaName) {
        this.setSchemaName(schemaName);
        if (this.schemaName == null) {
            throw new Error('schemaName is null');
        }
        if (this.columnDefs.length > 0) {
            console.warn(`columns is not empty, only refresh data, ${schemaName}`);
            this.refresh();
        }
        else {
            const schemaRes = await this.apiService.getResourceSchema({
                schemaName: this.schemaName,
            });
            this.schemaReadyResolve(true);
            if (schemaRes.columns.length > 0) {
                this.columnDefs = schemaRes.columns;
            }
            this.schema = schemaRes;
        }
        if (this.refPromise == null)
            throw new Error('refPromise is null, call resetRefPromise in getOrCreateGridModel()');
        await this.refPromise;
        // @ts-expect-error invoke react ref
        if (this.ref == null || typeof this.ref['setColDefs'] !== 'function') {
            throw new Error('ref is null');
        }
        // @ts-expect-error invoke react ref
        this.ref['setColDefs']();
    }
    isOpenTask(colName) {
        var _a;
        if (this.schema == null)
            throw new Error('schema is null');
        const col = this.schema.columns.find(col => col.name === colName);
        if (col == null)
            throw new Error(`not found column, ${colName}`);
        const builtInParseRet = builtinPluginSchema.safeParse((_a = col.plugins) === null || _a === void 0 ? void 0 : _a['builtin']);
        if (builtInParseRet.success) {
            return builtInParseRet.data.open_task;
        }
        else {
            return false;
        }
    }
    async getData(params) {
        var _a, _b;
        this._isFirstGetRows = false;
        if (this.schema == null)
            throw new Error('schema is null');
        const builtInParseRet = builtinPluginSchema.safeParse((_a = this.schema.plugins) === null || _a === void 0 ? void 0 : _a['builtin']);
        if (builtInParseRet.success && builtInParseRet.data.axios) {
            // todo: 将处理 builtin logic 抽到 plugin 里
            const res = await axios.request(Object.assign(Object.assign({}, builtInParseRet.data.axios), { headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                } }));
            return {
                data: res.data,
                pagination: { total: res.data.length },
            };
        }
        else {
            params.filterModel = mergeUriFilterModel(this.getUri(), params.filterModel);
            (_b = this.gridApi) === null || _b === void 0 ? void 0 : _b.setFilterModel(params.filterModel);
            const uri = updateUriFilterModel(this.getUri(), params.filterModel);
            this.setUri(uri);
            const dataRet = await this.apiService.getResourceData(params);
            const parseRet = getResourceDataOutputInnerSchema.safeParse(dataRet);
            if (parseRet.success) {
                return parseRet.data;
            }
            return {
                data: [dataRet],
                pagination: { total: 1 },
            };
        }
    }
    async putData(id, updatedValue) {
        await this.apiService.putResourceData({
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
    onNewForm() {
        if (typeof this.handlers.onClickNew === 'function') {
            const uri = createNewFormUri(this.getUri());
            this.handlers.onClickNew(uri);
        }
    }
};
GridModel = __decorate([
    injectable(),
    __param(0, inject(ThemeModelSymbol)),
    __param(1, inject(ApiServiceSymbol)),
    __param(2, optional()),
    __param(2, multiInject(CustomResourceSymbol)),
    __metadata("design:paramtypes", [ThemeModel, Object, Array])
], GridModel);
export { GridModel };
//# sourceMappingURL=grid.model.js.map