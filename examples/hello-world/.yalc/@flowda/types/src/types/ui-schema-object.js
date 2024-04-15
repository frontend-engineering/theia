"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceKeySchema = exports.ReferenceKeySchema = exports.AssociationKeySchema = exports.ColumnKeySchema = void 0;
const zod_1 = require("zod");
exports.ColumnKeySchema = zod_1.z.object({
    column_type: zod_1.z.string(),
    display_name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    example: zod_1.z.string().optional(),
    visible: zod_1.z.boolean(),
    access_type: zod_1.z.union([zod_1.z.literal('read_only'), zod_1.z.literal('read_write')]).default('read_write'),
});
exports.AssociationKeySchema = zod_1.z.object({
    display_name: zod_1.z.string(),
    slug: zod_1.z.string(),
    model_name: zod_1.z.string(),
    foreign_key: zod_1.z.string(),
    primary_key: zod_1.z.string(),
    visible: zod_1.z.boolean(),
});
exports.ReferenceKeySchema = zod_1.z.union([
    zod_1.z.object({
        display_name: zod_1.z.string(),
        model_name: zod_1.z.string(),
        reference_type: zod_1.z.literal('belongs_to'),
        foreign_key: zod_1.z.string(),
        primary_key: zod_1.z.string(),
    }),
    zod_1.z.object({
        display_name: zod_1.z.string(),
        model_name: zod_1.z.string(),
        reference_type: zod_1.z.literal('has_one'),
        foreign_key: zod_1.z.string(),
        primary_key: zod_1.z.string(),
        visible: zod_1.z.boolean(),
    }),
]);
exports.ResourceKeySchema = zod_1.z.object({
    name: zod_1.z.string(),
    slug: zod_1.z.string(),
    table_name: zod_1.z.string(),
    class_name: zod_1.z.string(),
    display_name: zod_1.z.string(),
    primary_key: zod_1.z.string().nullable(),
    visible: zod_1.z.boolean(),
    display_primary_key: zod_1.z.string(),
    display_column: zod_1.z.string().optional(),
    searchable_columns: zod_1.z.string().optional(),
    // openapi3-ts
    properties: zod_1.z.record(zod_1.z.string(), zod_1.z.union([exports.ColumnKeySchema, exports.AssociationKeySchema, exports.ReferenceKeySchema]))
        .optional(),
    required: zod_1.z.array(zod_1.z.string()).optional(),
});
//# sourceMappingURL=ui-schema-object.js.map