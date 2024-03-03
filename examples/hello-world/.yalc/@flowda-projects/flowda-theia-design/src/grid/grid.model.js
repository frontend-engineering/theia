var GridModel_1;
import { __decorate, __metadata, __param } from "tslib";
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { agFilterSchema } from '@flowda-projects/flowda-shared-types';
import * as _ from 'radash';
let GridModel = GridModel_1 = class GridModel {
    refresh() {
        if (this.gridApi && !this.gridApi.isDestroyed()) {
            this.gridApi.refreshInfiniteCache();
        }
    }
    /*
    最佳实践
    使用 strict mode，只需要写 setXxx 样板代码
    而不需要 @computed get xxx, 因为会有 console.warn 提示
     */
    setColumnDefs(columnDefs) {
        this.columnDefs = columnDefs;
    }
    setSchemaName(schemaName) {
        this.schemaName = schemaName;
    }
    constructor(trpcFactory) {
        this.trpcFactory = trpcFactory;
        this.columnDefs = [];
        this.schemaName = null;
        this.schema = null;
        this.handlers = {};
        this.isNotEmpty = false;
        this.gridApi = null;
        makeObservable(this);
    }
    async getCol(schemaName) {
        this.setSchemaName(schemaName);
        const schemaRes = await this.trpcFactory().hello.getResourceSchema.query({
            schemaName,
        });
        this.setColumnDefs(schemaRes.columns);
        this.schema = schemaRes;
        if (!_.isEmpty(this.filterModel)) {
            setTimeout(() => this.gridApi?.setFilterModel(this.filterModel), 0); // 等待 re render
        }
    }
    /**
     * @deprecated
     */
    convertIdToAgFilterModel(id) {
        return {
            id: { filterType: 'number', type: 'equals', filter: id },
        };
    }
    async getData(params) {
        const resourceQuery = this.getResourceQuery();
        const schemaQuery = resourceQuery[params.schemaName];
        this.filterModel = getFinalFilterModel(params.filterModel, this.filterModel, schemaQuery);
        resourceQuery[params.schemaName] = this.filterModel;
        if (this.columnDefs.length > 0 && params.filterModel != this.filterModel && !_.isEmpty(this.filterModel)) {
            setTimeout(() => this.gridApi?.setFilterModel(this.filterModel), 0); // 等待 re render
        }
        localStorage.setItem(GridModel_1.KEY, JSON.stringify(resourceQuery));
        const dataRet = await this.trpcFactory().hello.getResourceData.query(Object.assign({}, params, { filterModel: this.filterModel }));
        if (dataRet.pagination == null) {
            return {
                data: [dataRet],
                pagination: { total: 1 },
            };
        }
        return dataRet;
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
    async putData(id, updatedValue) {
        await this.trpcFactory().hello.putResourceData.mutate({
            schemaName: this.schemaName,
            id: id,
            updatedValue: updatedValue,
        });
    }
    onRefClick(field, value) {
        const ref = this.schema?.columns.find(t => t.name === field);
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
    __param(0, inject('trpcFactory')),
    __metadata("design:paramtypes", [Function])
], GridModel);
export { GridModel };
/*
尝试一种新的方便测试的设计原则
class 负责
1. 维护状态
2. inject 依赖
如果要针对 class 进行测试可以通过 mock 依赖，有最佳实践，但是就是样本代码多，test 不够轻量

为了更方便 test， 进一步将 class 内部的逻辑 extract 出 function
则对维护的状态，inject 的依赖直接构造参数，减少样本代码

这样既能使用 class 来做封装，又能方便 test，而且 class 内部的逻辑也很清晰，符合一种重构方法（将 step 抽成具名方法）
 */
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
    let memRet;
    if ( /*情况1*/mem == null && parseRet.success) {
        memRet = tryExtractFilterModelFromRef(storage);
    }
    else if ( /*情况2*/parseRet.success && parseRet.data._ref === '1') {
        const parseRet2 = agFilterSchema.safeParse(_.omit(storage, ['_ref']));
        if (parseRet2.success) {
            memRet = parseRet2.data;
        }
    } /*情况3*/
    else {
        memRet = param;
    }
    return memRet;
}
export function tryExtractFilterModelFromRef(storage) {
    const parseRet = agFilterSchema.parse(storage);
    if (parseRet._ref === '1') {
        const parseRet2 = agFilterSchema.safeParse(_.omit(storage, ['_ref']));
        if (parseRet2.success) {
            return parseRet2.data;
        }
    }
    else {
        return parseRet;
    }
}
//# sourceMappingURL=grid.model.js.map