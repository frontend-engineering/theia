"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceManager = void 0;
const tslib_1 = require("tslib");
const browser_1 = require("@theia/editor/lib/browser");
const inversify_1 = require("@theia/core/shared/inversify");
const resource_widget_factory_1 = require("./resource-widget-factory");
const resource_widget_1 = require("./resource-widget");
const core_1 = require("@theia/core");
const WIDGET_ID_REG = /resource-editor-opener:(.*ResourceSchema):\/\/\/.*:\d/;
let ResourceManager = class ResourceManager extends browser_1.EditorManager {
    constructor(logger, resourceWidgetFactory) {
        super();
        this.logger = logger;
        this.resourceWidgetFactory = resourceWidgetFactory;
        this.id = resource_widget_factory_1.ResourceWidgetFactory.ID;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.label = 'Resource Editor';
    }
    init() {
        super.init();
        this.onCurrentEditorChanged(widget => {
            if (widget && WIDGET_ID_REG.test(widget.id)) {
                const ret = widget.id.match(WIDGET_ID_REG);
                if (ret) {
                    if (!this.resourceWidgetFactory.gridModelMap.has(ret[1])) {
                        this.resourceWidgetFactory.gridModelMap.set(ret[1], this.resourceWidgetFactory.gridModelFactory());
                    }
                    const gridModel = this.resourceWidgetFactory.gridModelMap.get(ret[1]);
                    this.logger.info(`[ResourceManager] onCurrentEditorChanged ${ret[1]}`);
                    gridModel.getCol(ret[1]);
                    gridModel.refresh();
                }
            }
        });
    }
    canHandle(uri, options) {
        return 110; // > EditorManger 100
    }
    open(uri, options) {
        return super.open(uri, options);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extractIdFromWidget(widget) {
        if (widget instanceof resource_widget_1.ResourceWidget) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const uri = widget.uri.toString();
            const id = Number(widget.id.slice(widget.id.lastIndexOf(':') + 1));
            return { id, uri };
        }
        else {
            return super.extractIdFromWidget(widget);
        }
    }
    createWidgetOptions(uri, options) {
        if (uri.scheme.indexOf('resource.') > -1) {
            return {
                counter: options === null || options === void 0 ? void 0 : options.counter,
                kind: 'navigatable',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                uri: `${uri.scheme}:///${uri.name}`,
            };
        }
        return super.createWidgetOptions(uri, options);
    }
};
exports.ResourceManager = ResourceManager;
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ResourceManager.prototype, "init", null);
exports.ResourceManager = ResourceManager = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.ILogger)),
    tslib_1.__param(1, (0, inversify_1.inject)(resource_widget_factory_1.ResourceWidgetFactory)),
    tslib_1.__metadata("design:paramtypes", [Object, resource_widget_factory_1.ResourceWidgetFactory])
], ResourceManager);
//# sourceMappingURL=resource-manager.js.map