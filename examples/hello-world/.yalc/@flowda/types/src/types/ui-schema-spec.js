"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginKeySchema = exports.ResourceUISchema = exports.ColumnUISchema = void 0;
const zod_1 = require("zod");
const ui_schema_object_1 = require("./ui-schema-object");
exports.ColumnUISchema = ui_schema_object_1.ColumnKeySchema.extend({
    name: zod_1.z.string(),
    validators: zod_1.z.array(zod_1.z.unknown()),
    reference: ui_schema_object_1.ReferenceKeySchema.optional(),
});
exports.ResourceUISchema = ui_schema_object_1.ResourceKeySchema.omit({
    properties: true,
    required: true,
})
    .extend({
    namespace: zod_1.z.string().describe('网关作为命名空间'),
    columns: zod_1.z.array(exports.ColumnUISchema),
    associations: zod_1.z.array(ui_schema_object_1.AssociationKeySchema),
});
// todo: 去掉这种写法 zod 还不够强大，处理 template literal
exports.PluginKeySchema = zod_1.z.custom()
    .transform((val, ctx) => {
    return Object.fromEntries(Object.entries(val).filter(([k, v]) => {
        return k.startsWith('x-');
    }));
});
//# sourceMappingURL=ui-schema-spec.js.map