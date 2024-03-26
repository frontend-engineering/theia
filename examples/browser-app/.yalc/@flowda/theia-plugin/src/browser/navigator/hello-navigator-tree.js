"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloFileNavigatorTree = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const navigator_tree_1 = require("@theia/navigator/lib/browser/navigator-tree");
const trpc_client_1 = require("../trpc/trpc-client");
let HelloFileNavigatorTree = class HelloFileNavigatorTree extends navigator_tree_1.FileNavigatorTree {
    constructor(trpcProxyClient) {
        super();
        this.trpcProxyClient = trpcProxyClient;
    }
    resolveChildren(parent) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (navigator_tree_1.WorkspaceNode.is(parent)) {
                return parent.children;
            }
            const rt = yield this.trpcProxyClient.client.hello.resolveChildren.query({
                pid: parent.id,
            });
            return rt;
        });
    }
};
exports.HelloFileNavigatorTree = HelloFileNavigatorTree;
exports.HelloFileNavigatorTree = HelloFileNavigatorTree = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(trpc_client_1.TrpcProxyClient)),
    tslib_1.__metadata("design:paramtypes", [trpc_client_1.TrpcProxyClient])
], HelloFileNavigatorTree);
//# sourceMappingURL=hello-navigator-tree.js.map