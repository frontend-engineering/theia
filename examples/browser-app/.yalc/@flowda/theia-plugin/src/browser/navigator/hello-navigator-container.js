"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHelloFileNavigatorWidget = exports.createHelloFileNavigatorContainer = void 0;
const browser_1 = require("@theia/filesystem/lib/browser");
const browser_2 = require("@theia/navigator/lib/browser");
const navigator_container_1 = require("@theia/navigator/lib/browser/navigator-container");
const hello_navigator_tree_1 = require("./hello-navigator-tree");
const hello_navigator_model_1 = require("./hello-navigator-model");
const hello_navigator_widget_1 = require("./hello-navigator-widget");
function createHelloFileNavigatorContainer(parent) {
    const child = (0, browser_1.createFileTreeContainer)(parent, {
        tree: hello_navigator_tree_1.HelloFileNavigatorTree,
        model: hello_navigator_model_1.HelloFileNavigatorModel,
        widget: hello_navigator_widget_1.HelloFileNavigatorWidget,
        decoratorService: browser_2.NavigatorDecoratorService,
        props: navigator_container_1.FILE_NAVIGATOR_PROPS,
    });
    return child;
}
exports.createHelloFileNavigatorContainer = createHelloFileNavigatorContainer;
function createHelloFileNavigatorWidget(parent) {
    return createHelloFileNavigatorContainer(parent).get(hello_navigator_widget_1.HelloFileNavigatorWidget);
}
exports.createHelloFileNavigatorWidget = createHelloFileNavigatorWidget;
//# sourceMappingURL=hello-navigator-container.js.map