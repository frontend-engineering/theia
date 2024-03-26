"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginKeySchema = exports.ColumnUISchema = exports.ResourceUISchema = void 0;
const zod_1 = require("zod");
const ui_schema_object_1 = require("./ui-schema-object");
exports.ResourceUISchema = ui_schema_object_1.ResourceKeySchema.omit({
    key_type: true,
    properties: true,
    required: true,
});
exports.ColumnUISchema = ui_schema_object_1.ColumnKeySchema.omit({
    key_type: true,
}).extend({
    name: zod_1.z.string(),
    validators: zod_1.z.array(zod_1.z.unknown()),
    reference: ui_schema_object_1.ReferenceKeySchema.omit({ key_type: true }).optional(),
});
exports.PluginKeySchema = zod_1.z.custom()
    .transform((val, ctx) => {
    return Object.fromEntries(Object.entries(val).filter(([k, v]) => {
        return k.startsWith('x-');
    }));
});
//# sourceMappingURL=ui-schema-spec.js.map