"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrpcProxyClient = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@trpc/client");
const custom_link_1 = require("./custom-link");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const environment_1 = require("../environments/environment");
let TrpcProxyClient = class TrpcProxyClient {
    constructor(commandRegistry) {
        this.commandRegistry = commandRegistry;
        this.trpcProxyClient = (0, client_1.createTRPCProxyClient)({
            links: [
                (0, custom_link_1.customLink)({
                    commandRegistry: this.commandRegistry,
                }),
                (0, client_1.httpBatchLink)({
                    url: environment_1.environment.FLOWDA_URL,
                    // You can pass any HTTP headers you wish here
                    headers() {
                        return tslib_1.__awaiter(this, void 0, void 0, function* () {
                            return {
                                'x-from': 'hello-world',
                                authorization: 'Bearer ' + (localStorage.getItem('access_token') || ''),
                            };
                        });
                    },
                }),
            ],
            transformer: {
                input: {
                    // on client
                    serialize: object => object,
                    // on server -> resolver
                    deserialize: object => object,
                },
                output: {
                    // on server -> client
                    serialize: object => object,
                    // on client
                    deserialize: object => object,
                },
            },
        });
    }
    get client() {
        return this.trpcProxyClient;
    }
};
exports.TrpcProxyClient = TrpcProxyClient;
exports.TrpcProxyClient = TrpcProxyClient = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.CommandRegistry)),
    tslib_1.__metadata("design:paramtypes", [core_1.CommandRegistry])
], TrpcProxyClient);
//# sourceMappingURL=trpc-client.js.map