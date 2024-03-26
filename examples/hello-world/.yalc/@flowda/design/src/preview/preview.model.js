import { __decorate, __metadata } from "tslib";
import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
let PreviewModel = class PreviewModel {
    constructor() {
        this.hi = 'PreviewModel';
        makeObservable(this);
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], PreviewModel.prototype, "hi", void 0);
PreviewModel = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], PreviewModel);
export { PreviewModel };
//# sourceMappingURL=preview.model.js.map