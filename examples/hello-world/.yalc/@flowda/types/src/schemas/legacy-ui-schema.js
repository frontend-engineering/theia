"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceKeySchema = exports.selectOptionSchema = void 0;
const zod_1 = require("zod");
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
//# sourceMappingURL=legacy-ui-schema.js.map