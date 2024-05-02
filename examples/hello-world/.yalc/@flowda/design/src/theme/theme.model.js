import { __decorate, __metadata } from "tslib";
import { injectable } from 'inversify';
import { makeObservable, observable } from 'mobx';
let ThemeModel = class ThemeModel {
    constructor() {
        this.colorMode = 'dark';
        makeObservable(this);
    }
    setColorMode(colorMode) {
        this.colorMode = colorMode;
    }
};
__decorate([
    observable,
    __metadata("design:type", String)
], ThemeModel.prototype, "colorMode", void 0);
ThemeModel = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], ThemeModel);
export { ThemeModel };
//# sourceMappingURL=theme.model.js.map