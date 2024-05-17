import { __decorate, __metadata, __param } from "tslib";
import { ApiServiceSymbol, newFormUriSchema, ThemeModelSymbol, } from '@flowda/types';
import { URI } from '@theia/core';
import { inject, injectable } from 'inversify';
import { makeObservable, observable, runInAction } from 'mobx';
import * as qs from 'qs';
import { ThemeModel } from '../theme/theme.model';
import { getDefaultInitialValues, getFormItemColumns } from './new-form-utils';
let NewFormModel = class NewFormModel {
    // 暂不清楚为何 computed 失效 先绕过
    // 只有 theia 失效 storybook 没有问题
    // @computed get formItemColumns() {
    //   return this.schema == null ? [] : this.schema.columns.filter(col => {
    //     if (this.schema?.primary_key === col.name) return false
    //     if (!col.visible) return false
    //     return col.access_type !== 'read_only'
    //   })
    // }
    async onCurrentEditorChanged() {
        this.loadSchema(this.getUri());
    }
    get defaultInitialValues() {
        return getDefaultInitialValues(this.schema);
    }
    constructor(theme, apiService) {
        this.theme = theme;
        this.apiService = apiService;
        this.formItemColumns = [];
        makeObservable(this);
    }
    getTenant() {
        if (!this.uri)
            throw new Error('uri is null');
        const uri_ = new URI(this.uri);
        return uri_.authority;
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
    async loadSchema(uri) {
        this.setUri(uri);
        if (typeof uri === 'string') {
            uri = new URI(uri);
        }
        const query = newFormUriSchema.parse(qs.parse(uri.query));
        const ret = await this.apiService.getResourceSchema({
            tenant: this.getTenant(),
            schemaName: query.schemaName,
        });
        runInAction(() => {
            this.schema = ret;
            this.formItemColumns = getFormItemColumns(this.schema);
        });
    }
    async submit() {
        if (!this.formikProps)
            throw new Error(`formikProps not set`);
        this.formikProps.setSubmitting(true);
        const uri = new URI(this.getUri());
        const query = newFormUriSchema.parse(qs.parse(uri.query));
        await this.apiService.postResourceData({
            tenant: this.getTenant(),
            schemaName: query.schemaName,
            value: this.formikProps.values,
        });
        this.formikProps.setSubmitting(false);
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], NewFormModel.prototype, "schema", void 0);
__decorate([
    observable,
    __metadata("design:type", Array)
], NewFormModel.prototype, "formItemColumns", void 0);
NewFormModel = __decorate([
    injectable(),
    __param(0, inject(ThemeModelSymbol)),
    __param(1, inject(ApiServiceSymbol)),
    __metadata("design:paramtypes", [ThemeModel, Object])
], NewFormModel);
export { NewFormModel };
//# sourceMappingURL=new-form.model.js.map