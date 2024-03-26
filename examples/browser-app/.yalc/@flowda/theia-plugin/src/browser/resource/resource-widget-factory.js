"use strict";
var ResourceWidgetFactory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceWidgetFactory = void 0;
const tslib_1 = require("tslib");
const editor_widget_factory_1 = require("@theia/editor/lib/browser/editor-widget-factory");
const inversify_1 = require("@theia/core/shared/inversify");
const resource_widget_1 = require("./resource-widget");
const core_1 = require("@theia/core");
let ResourceWidgetFactory = ResourceWidgetFactory_1 = class ResourceWidgetFactory extends editor_widget_factory_1.EditorWidgetFactory {
    constructor(gridModelFactory) {
        super();
        this.gridModelFactory = gridModelFactory;
        this.gridModelMap = new Map();
        this.id = ResourceWidgetFactory_1.ID;
    }
    createWidget(options) {
        const _super = Object.create(null, {
            createWidget: { get: () => super.createWidget }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const uri = new core_1.URI(options.uri);
            if (uri.scheme.indexOf('resource.') > -1) {
                if (!this.gridModelMap.has(uri.scheme)) {
                    this.gridModelMap.set(uri.scheme, this.gridModelFactory());
                }
                const gridModel = this.gridModelMap.get(uri.scheme);
                const widget = new resource_widget_1.ResourceWidget({
                    id: ResourceWidgetFactory_1.createID(uri),
                    title: uri.displayName,
                    model: gridModel,
                });
                widget.id = ResourceWidgetFactory_1.ID + ':' + options.uri + ':' + options.counter;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                widget.uri = options.uri;
                return Promise.resolve(widget);
            }
            return _super.createWidget.call(this, options);
        });
    }
};
exports.ResourceWidgetFactory = ResourceWidgetFactory;
ResourceWidgetFactory.ID = 'resource-editor-opener';
exports.ResourceWidgetFactory = ResourceWidgetFactory = ResourceWidgetFactory_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)('Factory<GridModel>')),
    tslib_1.__metadata("design:paramtypes", [Function])
], ResourceWidgetFactory);
//# sourceMappingURL=resource-widget-factory.js.map