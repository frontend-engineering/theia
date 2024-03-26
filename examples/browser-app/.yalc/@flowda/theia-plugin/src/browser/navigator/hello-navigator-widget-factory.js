"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloNavigatorWidgetFactory = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/navigator/lib/browser");
let HelloNavigatorWidgetFactory = class HelloNavigatorWidgetFactory extends browser_1.NavigatorWidgetFactory {
    createWidget() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const viewContainer = this.viewContainerFactory({
                id: browser_1.EXPLORER_VIEW_CONTAINER_ID,
                progressLocationId: 'explorer',
            });
            viewContainer.setTitleOptions(browser_1.EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS);
            // const openEditorsWidget = await this.widgetManager.getOrCreateWidget(OpenEditorsWidget.ID)
            // const navigatorWidget = await this.widgetManager.getOrCreateWidget(FILE_NAVIGATOR_ID)
            const helloNavigatorWidget = yield this.widgetManager.getOrCreateWidget(browser_1.FILE_NAVIGATOR_ID + '-hello');
            // viewContainer.addWidget(navigatorWidget, this.fileNavigatorWidgetOptions)
            // viewContainer.addWidget(openEditorsWidget, this.openEditorsWidgetOptions)
            viewContainer.addWidget(helloNavigatorWidget, {
                order: 2,
                canHide: false,
                initiallyCollapsed: false,
                weight: 80,
                disableDraggingToOtherContainers: true,
            });
            return viewContainer;
        });
    }
};
exports.HelloNavigatorWidgetFactory = HelloNavigatorWidgetFactory;
exports.HelloNavigatorWidgetFactory = HelloNavigatorWidgetFactory = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], HelloNavigatorWidgetFactory);
//# sourceMappingURL=hello-navigator-widget-factory.js.map