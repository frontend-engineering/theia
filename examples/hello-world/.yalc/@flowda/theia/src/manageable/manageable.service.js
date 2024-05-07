import { __decorate, __metadata, __param } from "tslib";
import { URI } from '@theia/core';
import { inject, injectable } from 'inversify';
import { CheckManageableFactorySymbol, MANAGEABLE_EDITOR_ID, ManageableModelFactorySymbol, ManageableWidgetFactorySymbol, NOT_REGISTERED, NOT_REGISTERED_SCHEME, } from '@flowda/types';
import { getUriDisplayName, uriAsKey } from '@flowda/design';
let ManageableService = class ManageableService {
    constructor(checkManageableFactory, modelFactory, widgetAbstractFactory) {
        this.checkManageableFactory = checkManageableFactory;
        this.modelFactory = modelFactory;
        this.widgetAbstractFactory = widgetAbstractFactory;
        this.manageableModelMap = new Map();
    }
    isManageable(scheme) {
        return this.checkManageableFactory(scheme);
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
    removeModel(uri) {
        if (typeof uri === 'string') {
            uri = new URI(uri);
        }
        const key = uriAsKey(uri);
        if (!this.manageableModelMap.has(key)) {
            throw new Error(`Not exist ${uri.toString(false)}`);
        }
        this.manageableModelMap.delete(key);
    }
    createWidget(options) {
        const uri = new URI(options.uri);
        const model = this.getOrCreateGridModel(uri);
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
    __param(0, inject(CheckManageableFactorySymbol)),
    __param(1, inject(ManageableModelFactorySymbol)),
    __param(2, inject(ManageableWidgetFactorySymbol)),
    __metadata("design:paramtypes", [Function, Function, Function])
], ManageableService);
export { ManageableService };
//# sourceMappingURL=manageable.service.js.map