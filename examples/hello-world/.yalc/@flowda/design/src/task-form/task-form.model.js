import { __decorate, __metadata, __param } from "tslib";
import { ApiServiceSymbol, taskUriOutputSchema, ThemeModelSymbol, WorkflowConfigSymbol, } from '@flowda/types';
import { inject, injectable, multiInject } from 'inversify';
import { ThemeModel } from '../theme/theme.model';
import axios from 'axios';
import * as _ from 'radash';
import { getChangedValues } from './task-form-utils';
import { computed, makeObservable, observable, runInAction } from 'mobx';
import { URI } from '@theia/core';
import * as qs from 'qs';
let TaskFormModel = class TaskFormModel {
    async onCurrentEditorChanged() {
        await this.loadTask(this.getUri());
    }
    get taskId() {
        if (!this._taskId)
            throw new Error(`Not found taskId, call loadTask first`);
        return this._taskId;
    }
    get taskDefinitionKey() {
        if (!this._taskDefinitionKey)
            throw new Error(`Not set taskDefinitionKey, call loadTask first`);
        return this._taskDefinitionKey;
    }
    get wfCfg() {
        const wfCfgs = this.wfCfgs.reduce((acc, cur) => acc.concat(cur));
        const ret = wfCfgs.find(cfg => cfg.taskDefinitionKey === this.taskDefinitionKey);
        if (!ret)
            throw new Error(`not found workflow config, taskDefinitionKey:${this.taskDefinitionKey}`);
        return ret;
    }
    async getSchema() {
        if (this.wfCfg.resource.schemaName == null)
            throw new Error(`wfCfg.resource.schemaName is null`);
        const res = await this.apiService.getResourceSchema({
            schemaName: this.wfCfg.resource.schemaName,
        });
        return res;
    }
    get columns() {
        if (this.schema == null)
            return [];
        const wfCfg = this.wfCfg;
        return wfCfg.resource.columns.map(wfCol => {
            const resColRet = this.schema.columns.find(resCol => resCol.name === wfCol.name);
            if (!resColRet)
                throw new Error(`not found workflow column, ${wfCol.name}`);
            return Object.assign(Object.assign({}, resColRet), wfCol);
        });
    }
    // suppress warning: uncontrolled input to be controlled
    get defaultInitialValues() {
        if (this._taskDefinitionKey == null)
            return {};
        return _.objectify(this.wfCfg.resource.columns, i => i.name, i => '');
    }
    constructor(theme, apiService, wfCfgs) {
        this.theme = theme;
        this.apiService = apiService;
        this.wfCfgs = wfCfgs;
        // save initial backend response data to computed changed value
        this.initialBackendValues = {};
        makeObservable(this);
    }
    getUri() {
        if (!this.uri)
            throw new Error('uri is null');
        return this.uri;
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
    // wfCfg resource input map, map global vars to resource select, then load data
    async loadTask(uri) {
        this.setUri(uri);
        if (typeof uri === 'string') {
            uri = new URI(uri);
        }
        const query = taskUriOutputSchema.parse(qs.parse(uri.query));
        this._taskId = query.taskId;
        this._taskDefinitionKey = query.taskDefinitionKey;
        const [schemaRes, formVarRes] = await Promise.all([
            this.getSchema(),
            axios.request({
                method: 'get',
                url: `http://localhost:3310/flowda-gateway-api/camunda/engine-rest/task/${query.taskId}/form-variables`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }),
        ]);
        runInAction(() => {
            this.schema = schemaRes;
        });
        const vars = formVarRes.data;
        const input = _.mapValues(this.wfCfg.resource.inputMap, (v, k) => {
            return vars[v].value;
        });
        // todo: type infer 没有 work
        const ret = (await this.apiService.getResourceData({
            schemaName: this.wfCfg.resource.schemaName,
            current: 0,
            pageSize: 1,
            sort: [],
            filterModel: {
                number: {
                    filterType: 'text',
                    type: 'equals',
                    filter: input.number,
                },
            },
        }));
        const values = ret.data[0];
        if (!this.formikProps)
            throw new Error(`formikProps is null`);
        this.initialBackendValues = values;
        this.formikProps.setValues(values == null ? {} : _.mapValues(values, v => (v == null ? '' : v)));
    }
    async submit(values) {
        const changedValues = getChangedValues(values, this.initialBackendValues);
        if (_.isEmpty(changedValues)) {
            // todo message
            return;
        }
        if (!this.formikProps)
            throw new Error(`formikProps not set`);
        this.formikProps.setSubmitting(true);
        if (values.id == null)
            throw new Error('values.id is null');
        await this.apiService.putResourceData({
            schemaName: this.wfCfg.resource.schemaName,
            id: values.id,
            updatedValue: changedValues,
        });
        // 2. invoke workflow rest api finish task
        const res = await axios.request({
            method: 'post',
            url: `http://localhost:3310/flowda-gateway-api/camunda/engine-rest/task/${this.taskId}/complete`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        // todo: 如果失败手动回滚
        this.formikProps.setSubmitting(false);
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], TaskFormModel.prototype, "schema", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TaskFormModel.prototype, "columns", null);
TaskFormModel = __decorate([
    injectable(),
    __param(0, inject(ThemeModelSymbol)),
    __param(1, inject(ApiServiceSymbol)),
    __param(2, multiInject(WorkflowConfigSymbol)),
    __metadata("design:paramtypes", [ThemeModel, Object, Array])
], TaskFormModel);
export { TaskFormModel };
//# sourceMappingURL=task-form.model.js.map