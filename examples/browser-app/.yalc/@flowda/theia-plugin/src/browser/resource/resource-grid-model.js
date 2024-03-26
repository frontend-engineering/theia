"use strict";
var ResourceGridModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceGridModel = exports.GridCellCommand = void 0;
const tslib_1 = require("tslib");
const design_1 = require("@flowda/design");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
exports.GridCellCommand = {
    id: 'resource-grid-cell',
    category: 'Examples',
    label: 'Open reference',
};
let ResourceGridModel = ResourceGridModel_1 = class ResourceGridModel extends design_1.GridModel {
    constructor(openerService, hoverService, contextMenuRenderer, trpcFactory) {
        super();
        this.openerService = openerService;
        this.hoverService = hoverService;
        this.contextMenuRenderer = contextMenuRenderer;
        this.trpcFactory = trpcFactory;
    }
    postConstruct() {
        this.handlers.onRefClick = this.handleOnRefClick.bind(this);
        this.handlers.onMouseEnter = this.handleMouseEnter.bind(this);
        this.handlers.onContextMenu = this.handleContextMenu.bind(this);
        this.handlers.getResourceData = this.trpcFactory().hello.getResourceData.query;
        this.handlers.getResourceSchema = this.trpcFactory().hello.getResourceSchema.query;
        this.handlers.putResourceData = this.trpcFactory().hello.putResourceData.mutate;
    }
    handleMouseEnter(e) {
        // todo: 判断是否按照 command
        this.hoverService.requestHover({
            content: document.createElement('reference-preview'),
            target: e.currentTarget,
            position: 'right',
        });
    }
    handleContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        const { clientX, clientY } = e;
        this.contextMenuRenderer.render({
            menuPath: ResourceGridModel_1.CONTEXT_MENU,
            anchor: { x: clientX, y: clientY },
            args: this.getContextMenuArgs(e),
        });
    }
    getContextMenuArgs(event) {
        const args = [this];
        return args;
    }
    handleOnRefClick(v) {
        const k = design_1.GridModel.KEY;
        const resourceQuery = localStorage.getItem(k);
        let prev = {};
        if (resourceQuery != null) {
            try {
                prev = JSON.parse(resourceQuery);
            }
            catch (e) {
                prev = {};
            }
        }
        prev[v.schemaName] = {
            _ref: '1',
            id: { filterType: 'number', type: 'equals', filter: v.id },
        };
        localStorage.setItem(k, JSON.stringify(prev));
        (0, browser_1.open)(this.openerService, {
            scheme: v.schemaName,
            name: v.name,
        }, {
            mode: 'reveal',
            preview: true,
        });
    }
};
exports.ResourceGridModel = ResourceGridModel;
ResourceGridModel.CONTEXT_MENU = ['resource-grid.context.menu'];
tslib_1.__decorate([
    (0, inversify_1.postConstruct)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ResourceGridModel.prototype, "postConstruct", null);
exports.ResourceGridModel = ResourceGridModel = ResourceGridModel_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(browser_1.OpenerService)),
    tslib_1.__param(1, (0, inversify_1.inject)(browser_1.HoverService)),
    tslib_1.__param(2, (0, inversify_1.inject)(browser_1.ContextMenuRenderer)),
    tslib_1.__param(3, (0, inversify_1.inject)('trpcFactory')),
    tslib_1.__metadata("design:paramtypes", [Object, browser_1.HoverService,
        browser_1.ContextMenuRenderer, Function])
], ResourceGridModel);
//# sourceMappingURL=resource-grid-model.js.map