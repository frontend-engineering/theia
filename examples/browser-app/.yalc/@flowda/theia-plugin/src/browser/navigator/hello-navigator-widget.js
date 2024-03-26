"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloFileNavigatorWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/navigator/lib/browser");
const browser_2 = require("@theia/core/lib/browser");
const hello_navigator_model_1 = require("./hello-navigator-model");
let HelloFileNavigatorWidget = class HelloFileNavigatorWidget extends browser_1.FileNavigatorWidget {
    constructor(props, model, contextMenuRenderer) {
        super(props, model, contextMenuRenderer);
        this.model = model;
        this.id = browser_1.FILE_NAVIGATOR_ID + '-hello';
        this.addClass(browser_1.CLASS);
    }
    /*
    label provider 太复杂了 override 直接计算
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toNodeName(node) {
        return node.name;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toNodeIcon(node) {
        if ('expanded' in node && Array.isArray(node.children)) {
            return `${(0, browser_2.codicon)('folder')} default-folder-icon`;
        }
        else {
            return `${(0, browser_2.codicon)('file')} default-file-icon`;
        }
    }
    doUpdateRows() {
        super.doUpdateRows();
        this.title.label = 'Menus';
    }
};
exports.HelloFileNavigatorWidget = HelloFileNavigatorWidget;
exports.HelloFileNavigatorWidget = HelloFileNavigatorWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(browser_2.TreeProps)),
    tslib_1.__param(1, (0, inversify_1.inject)(hello_navigator_model_1.HelloFileNavigatorModel)),
    tslib_1.__param(2, (0, inversify_1.inject)(browser_2.ContextMenuRenderer)),
    tslib_1.__metadata("design:paramtypes", [Object, hello_navigator_model_1.HelloFileNavigatorModel,
        browser_2.ContextMenuRenderer])
], HelloFileNavigatorWidget);
//# sourceMappingURL=hello-navigator-widget.js.map