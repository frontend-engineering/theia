"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putDataSchema = exports.getDataSchema = exports.resourceKeySchema = exports.selectOptionSchema = void 0;
const zod_1 = require("zod");
// todo: 后续开源相关服务后再同步调整
exports.selectOptionSchema = zod_1.z.object({
    value: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]),
    label: zod_1.z.string(),
});
exports.resourceKeySchema = zod_1.z.object({
    origin: zod_1.z.string(),
    resource: zod_1.z.string(),
    resourceSchema: zod_1.z.string(),
    id: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).optional(),
});
exports.getDataSchema = zod_1.z.object({
    user: zod_1.z.any(),
    path: zod_1.z.string(),
    query: zod_1.z.any(),
});
exports.putDataSchema = zod_1.z.object({
    user: zod_1.z.any(),
    path: zod_1.z.string(),
    values: zod_1.z.any(),
});
//# sourceMappingURL=legacy-ui-schema.js.map