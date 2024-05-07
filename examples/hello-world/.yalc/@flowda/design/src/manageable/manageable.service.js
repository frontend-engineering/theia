import { __decorate, __metadata, __param } from "tslib";
import { URI } from '@theia/core';
import { inject, injectable } from 'inversify';
import { MANAGEABLE_EDITOR_ID, ManageableModelFactorySymbol, ManageableWidgetFactorySymbol, NOT_REGISTERED, NOT_REGISTERED_SCHEME, } from '@flowda/types';
import { getUriDisplayName, uriAsKey } from '../uri/uri-utils';
let ManageableService = class ManageableService {
    constructor(modelFactory, widgetAbstractFactory) {
        this.modelFactory = modelFactory;
        this.widgetAbstractFactory = widgetAbstractFactory;
        this.manageableModelMap = new Map();
    }
    getOrCreateGridModel(uri) {
        if (typeof uri === 'string') {
            uri = new URI(uri);
        }
        const key = uriAsKey(uri);
        try {
            const ret = this.manageableModelMap.get(key);
            if (ret == null) {
                const model = this.modelFactory(uri.scheme);
                model.setUri(uri);
                this.manageableModelMap.set(key, model);
                return model;
            }
            else {
                return ret;
            }
        }
        catch (e) {
            if (e instanceof Error) {
                if (e.message.indexOf(NOT_REGISTERED) > -1) {
                    throw new Error(NOT_REGISTERED_SCHEME + ' ' + uri);
                }
                else {
                    throw e;
                }
            }
            else {
                throw e;
            }
        }
    }
    createWidget(options) {
        const uri = new URI(options.uri);
        const model = this.getOrCreateGridModel(uri);
        model.resetGridReadyPromise(options.uri);
        const factory = this.widgetAbstractFactory(uri.scheme);
        const widget = factory({
            id: MANAGEABLE_EDITOR_ID + ':' + uriAsKey(options.uri) + ':' + options.counter,
            uri: options.uri,
            title: getUriDisplayName(uri),
            model: model,
        });
        return widget;
    }
};
ManageableService = __decorate([
    injectable(),
    __param(0, inject(ManageableModelFactorySymbol)),
    __param(1, inject(ManageableWidgetFactorySymbol)),
    __metadata("design:paramtypes", [Function, Function])
], ManageableService);
export { ManageableService };
//# sourceMappingURL=manageable.service.js.map