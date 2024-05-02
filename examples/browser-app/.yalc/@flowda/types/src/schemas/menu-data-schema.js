"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agMenuItemSchema = exports.menuItemSchema = exports.baseMenuItemSchema = void 0;
const zod_1 = require("zod");
// https://github.com/colinhacks/zod/discussions/2245
exports.baseMenuItemSchema = zod_1.z.object({
    name: zod_1.z.string(),
    slug: zod_1.z.string(),
    id: zod_1.z.string(),
    icon: zod_1.z.string().optional()
});
exports.menuItemSchema = exports.baseMenuItemSchema.extend({
    children: zod_1.z.lazy(() => exports.menuItemSchema.array().optional()),
    parent: zod_1.z.lazy(() => exports.menuItemSchema.optional()),
});
exports.agMenuItemSchema = exports.baseMenuItemSchema.extend({
    hierarchy: zod_1.z.array(zod_1.z.string())
});
//# sourceMappingURL=menu-data-schema.js.map