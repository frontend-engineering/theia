"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctxUserSchemaDto = exports.ctxUserSchema = exports.ctxTenantSchemaDto = exports.ctxTenantSchema = void 0;
const zod_1 = require("zod");
const zod_utils_1 = require("../utils/zod-utils");
exports.ctxTenantSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
});
class ctxTenantSchemaDto extends (0, zod_utils_1.createZodDto)(exports.ctxTenantSchema) {
}
exports.ctxTenantSchemaDto = ctxTenantSchemaDto;
exports.ctxUserSchema = zod_1.z.object({
    id: zod_1.z.number(),
    tenantId: zod_1.z.number(),
    username: zod_1.z.string(),
});
class ctxUserSchemaDto extends (0, zod_utils_1.createZodDto)(exports.ctxUserSchema) {
}
exports.ctxUserSchemaDto = ctxUserSchemaDto;
//# sourceMappingURL=trpc-schema.js.map