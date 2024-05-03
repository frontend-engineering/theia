"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yongchengTrpc = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@trpc/client");
exports.yongchengTrpc = (0, client_1.createTRPCProxyClient)({
    links: [
        (0, client_1.httpBatchLink)({
            url: `${process.env.YONGCHENG_URL}/api/trpc`,
            headers() {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return {
                        'x-from': 'flowda-gateway',
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
//# sourceMappingURL=trpc-client.js.map