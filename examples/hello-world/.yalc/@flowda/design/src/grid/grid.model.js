var GridModel_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import * as _ from 'radash';
import { agFilterSchema, getResourceDataOutputInnerSchema, } from '@flowda/types';
let GridModel = GridModel_1 = class GridModel {
    refresh() {
        if (this.gridApi && !this.gridApi.isDestroyed()) {
            this.gridApi.refreshInfiniteCache();
        }
    }
    setColumnDefs(columnDefs) {
        this.columnDefs = columnDefs;
    }
    setSchemaName(schemaName) {
        this.schemaName = schemaName;
    }
    constructor() {
        this.columnDefs = [];
        this.schemaName = null;
        this.schema = null;
        this.filterModel = null;
        this.handlers = {};
        this.isNotEmpty = false;
        this.gridApi = null;
        makeObservable(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
    }
    getCol(schemaName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setSchemaName(schemaName);
            if (typeof this.handlers.getResourceSchema !== 'function') {
                throw new Error('handlers.getResourceSchema is not implemented');
            }
            const schemaRes = yield this.handlers.getResourceSchema({
                schemaName,
            });
            this.setColumnDefs(schemaRes.columns);
            this.schema = schemaRes;
            if (!_.isEmpty(this.filterModel)) {
                setTimeout(() => { var _a; return (_a = this.gridApi) === null || _a === void 0 ? void 0 : _a.setFilterModel(this.filterModel); }, 0); // 等待 re render
            }
        });
    }
    getData(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceQuery = this.getResourceQuery();
            const schemaQuery = resourceQuery[params.schemaName];
            this.filterModel = getFinalFilterModel(params.filterModel, this.filterModel, schemaQuery);
            if (this.filterModel != null) {
                resourceQuery[params.schemaName] = this.filterModel;
            }
            if (this.columnDefs.length > 0 && params.filterModel != this.filterModel && !_.isEmpty(this.filterModel)) {
                setTimeout(() => { var _a; return (_a = this.gridApi) === null || _a === void 0 ? void 0 : _a.setFilterModel(this.filterModel); }, 0); // 等待 re render
            }
            localStorage.setItem(GridModel_1.KEY, JSON.stringify(resourceQuery));
            if (typeof this.handlers.getResourceData !== 'function') {
                throw new Error('handlers.getResourceData is not implemented');
            }
            const dataRet = yield this.handlers.getResourceData(Object.assign({}, params, { filterModel: this.filterModel }));
            const parseRet = getResourceDataOutputInnerSchema.safeParse(dataRet);
            if (parseRet.success) {
                return parseRet.data;
            }
            return {
                data: [dataRet],
                pagination: { total: 1 },
            };
        });
    }
    getResourceQuery() {
        const prev = localStorage.getItem(GridModel_1.KEY);
        if (prev != null) {
            try {
                return JSON.parse(prev);
            }
            catch (e) {
                //
            }
        }
        return {};
    }
    putData(id, updatedValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.handlers.putResourceData != 'function') {
                throw new Error('handlers.putResourceData is not implemented');
            }
            yield this.handlers.putResourceData({
                schemaName: this.schemaName,
                id: id,
                updatedValue: updatedValue,
            });
        });
    }
    onMouseEnter(e) {
        if (typeof this.handlers.onMouseEnter === 'function') {
            this.handlers.onMouseEnter(e);
        }
    }
    onContextMenu(e) {
        if (typeof this.handlers.onContextMenu === 'function') {
            this.handlers.onContextMenu(e);
        }
    }
    onRefClick(field, value) {
        var _a;
        const ref = (_a = this.schema) === null || _a === void 0 ? void 0 : _a.columns.find(t => t.name === field);
        if (typeof this.handlers.onRefClick === 'function') {
            this.handlers.onRefClick({
                schemaName: `resource.${this.schema.namespace}.${ref.reference.model_name}ResourceSchema`,
                name: ref.reference.display_name,
                id: value,
            });
        }
    }
};
GridModel.KEY = 'resourceQuery';
__decorate([
    observable,
    __metadata("design:type", Array)
], GridModel.prototype, "columnDefs", void 0);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], GridModel.prototype, "setColumnDefs", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GridModel.prototype, "setSchemaName", null);
GridModel = GridModel_1 = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], GridModel);
export { GridModel };
/**
 * 情况1：刷新 尝试从 localStorage 恢复
 *       注意：非刷新 关闭 tab 则认为清空条件
 * 情况2：非刷新，跳转修改 filter，则覆盖
 * 情况3：非刷新 手动修改 优先级最高
 *
 * @param param ag grid 前端传入
 * @param mem 内存 grid model 维护
 * @param storage localStorage
 */
export function getFinalFilterModel(param, mem, storage) {
    const parseRet = agFilterSchema.safeParse(storage);
    if ( /*情况1*/mem == null && parseRet.success) {
        return tryExtractFilterModelFromRef(storage);
    }
    if ( /*情况2*/parseRet.success && parseRet.data._ref === '1') {
        const parseRet2 = agFilterSchema.safeParse(_.omit(storage, ['_ref']));
        if (parseRet2.success) {
            return parseRet2.data;
        }
    }
    /*情况3*/
    return param;
}
export function tryExtractFilterModelFromRef(storage) {
    const parseRet = agFilterSchema.parse(storage);
    if (parseRet._ref === '1') {
        const parseRet2 = agFilterSchema.safeParse(_.omit(storage, ['_ref']));
        if (parseRet2.success) {
            return parseRet2.data;
        }
    }
    return parseRet;
}
//# sourceMappingURL=grid.model.js.map