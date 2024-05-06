import { __decorate, __metadata, __param } from "tslib";
import { URI } from "@theia/core";
import { inject, injectable } from "inversify";
import { uriAsKey } from "../uri/uri-utils";
import { ManageableModelFactorySymbol } from "@flowda/types";
export const NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
let ManageableService = class ManageableService {
    constructor(manageableModelFactory) {
        this.manageableModelFactory = manageableModelFactory;
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
                const model = this.manageableModelFactory(uri.scheme);
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
                    throw new Error(`unknown uri, ${uri}`);
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
};
ManageableService = __decorate([
    injectable(),
    __param(0, inject(ManageableModelFactorySymbol)),
    __metadata("design:paramtypes", [Function])
], ManageableService);
export { ManageableService };
//# sourceMappingURL=manageable.sevice.js.map