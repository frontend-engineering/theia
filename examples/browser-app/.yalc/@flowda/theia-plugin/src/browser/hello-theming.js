"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloThemeService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const monaco_indexed_db_1 = require("@theia/monaco/lib/browser/monaco-indexed-db");
let HelloThemeService = class HelloThemeService extends monaco_indexed_db_1.ThemeServiceWithDB {
    init() {
        this.register({
            id: 'linear-dark',
            type: 'dark',
            label: 'Dark (Linear)',
            editorTheme: 'dark-linear',
        });
        super.init();
    }
};
exports.HelloThemeService = HelloThemeService;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HelloThemeService.prototype, "init", null);
exports.HelloThemeService = HelloThemeService = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], HelloThemeService);
//# sourceMappingURL=hello-theming.js.map