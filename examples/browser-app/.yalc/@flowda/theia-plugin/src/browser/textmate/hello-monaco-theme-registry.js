"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloMonacoThemeRegistry = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-var-requires */
const monaco_theme_registry_1 = require("@theia/monaco/lib/browser/textmate/monaco-theme-registry");
const inversify_1 = require("@theia/core/shared/inversify");
let HelloMonacoThemeRegistry = class HelloMonacoThemeRegistry extends monaco_theme_registry_1.MonacoThemeRegistry {
    initializeDefaultThemes() {
        super.initializeDefaultThemes();
        this.register(require('../../../data/monaco-themes/vscode/dark_linear.json'), {
            './dark_vs.json': require('../../../data/monaco-themes/vscode/dark_vs.json'),
            './dark_plus.json': require('../../../data/monaco-themes/vscode/dark_plus.json'),
        }, 'dark-linear', 'vs-dark');
    }
};
exports.HelloMonacoThemeRegistry = HelloMonacoThemeRegistry;
exports.HelloMonacoThemeRegistry = HelloMonacoThemeRegistry = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], HelloMonacoThemeRegistry);
//# sourceMappingURL=hello-monaco-theme-registry.js.map