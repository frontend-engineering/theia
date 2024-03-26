"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloFileNavigatorModel = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/navigator/lib/browser");
const navigator_tree_1 = require("@theia/navigator/lib/browser/navigator-tree");
const hello_navigator_tree_1 = require("./hello-navigator-tree");
const browser_2 = require("@theia/core/lib/browser");
const trpc_client_1 = require("../trpc/trpc-client");
const resource_widget_factory_1 = require("../resource/resource-widget-factory");
let HelloFileNavigatorModel = class HelloFileNavigatorModel extends browser_1.FileNavigatorModel {
    constructor(tree, openerService, trpcProxyClient, resourceWidgetFactory) {
        super();
        this.tree = tree;
        this.openerService = openerService;
        this.trpcProxyClient = trpcProxyClient;
        this.resourceWidgetFactory = resourceWidgetFactory;
    }
    createRoot() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rt = yield this.trpcProxyClient.client.hello.createRoot.query();
            return rt;
        });
    }
    previewNode(node) {
        if ('uri' in node) {
            if (!this.resourceWidgetFactory.gridModelMap.has(node.id)) {
                this.resourceWidgetFactory.gridModelMap.set(node.id, this.resourceWidgetFactory.gridModelFactory());
            }
            // const gridModel = this.resourceWidgetFactory.gridModelMap.get(node.id)!
            // gridModel.getCol(node.id)
            this.logger.info(`[HelloFileNavigatorModel] previewNode ${node.id}`);
            // todo: 换种方式请求
            // gridModel.getData(node.id, { current: 0, pageSize: 20, sort: [] })
            (0, browser_2.open)(this.openerService, node.uri, {
                mode: 'reveal',
                preview: true,
            });
        }
    }
};
exports.HelloFileNavigatorModel = HelloFileNavigatorModel;
exports.HelloFileNavigatorModel = HelloFileNavigatorModel = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(hello_navigator_tree_1.HelloFileNavigatorTree)),
    tslib_1.__param(1, (0, inversify_1.inject)(browser_2.OpenerService)),
    tslib_1.__param(2, (0, inversify_1.inject)(trpc_client_1.TrpcProxyClient)),
    tslib_1.__param(3, (0, inversify_1.inject)(resource_widget_factory_1.ResourceWidgetFactory)),
    tslib_1.__metadata("design:paramtypes", [navigator_tree_1.FileNavigatorTree, Object, trpc_client_1.TrpcProxyClient,
        resource_widget_factory_1.ResourceWidgetFactory])
], HelloFileNavigatorModel);
//# sourceMappingURL=hello-navigator-model.js.map