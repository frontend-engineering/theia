"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtinPluginSchema = void 0;
const zod_1 = require("zod");
exports.builtinPluginSchema = zod_1.z.object({
    axios: zod_1.z.object({
        method: zod_1.z.string(),
        url: zod_1.z.string(),
        data: zod_1.z.any(),
    }).optional(),
    open_task: zod_1.z.boolean().optional()
});
//# sourceMappingURL=plugin-builtin.js.map