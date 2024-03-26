"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceKeySchema = exports.putResourceDataInputSchema = exports.getResourceDataOutputSchema = exports.getResourceDataOutputInnerSchema = exports.getResourceDataInputSchema = exports.getResourceInputSchema = exports.resourceSchema = exports.resourceAssociationSchema = exports.resourceColumnSchema = exports.selectOptionSchema = void 0;
const zod_1 = require("zod");
const ag_grid_schema_1 = require("./ag-grid-schema");
exports.selectOptionSchema = zod_1.z.object({
    value: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]),
    label: zod_1.z.string(),
});
exports.resourceColumnSchema = zod_1.z.object({
    name: zod_1.z.string(),
    access_type: zod_1.z.enum(['read_only']).optional(),
    column_type: zod_1.z.enum(['reference', 'string', 'tag', 'integer', 'datetime', 'textarea', 'boolean']),
    prisma: zod_1.z.boolean().optional(),
    format: zod_1.z
        .object({
        select_options: exports.selectOptionSchema.array(),
    })
        .optional(),
    reference: zod_1.z.object({
        model_name: zod_1.z.string(),
        primary_key: zod_1.z.string(),
        display_name: zod_1.z.string(),
        display_column: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string()), zod_1.z.undefined()]),
        'x-relationField': zod_1.z.string(),
        'x-onSoftDelete': zod_1.z.string(),
        'x-unique': zod_1.z.boolean().optional(),
    }),
    display_name: zod_1.z.string().optional(),
    validators: zod_1.z.array(zod_1.z.union([
        zod_1.z.object({
            required: zod_1.z.boolean(),
        }),
        zod_1.z.object({
            format: zod_1.z.string(),
            message: zod_1.z.string(),
        }),
    ])),
});
exports.resourceAssociationSchema = zod_1.z.object({
    foreign_key: zod_1.z.string(),
    model_name: zod_1.z.string(),
    primary_key: zod_1.z.string(),
    name: zod_1.z.string(),
    slug: zod_1.z.string(),
    display_name: zod_1.z.string(),
    schema_name: zod_1.z.string(),
});
exports.resourceSchema = zod_1.z.object({
    namespace: zod_1.z.string().optional(),
    prisma: zod_1.z.boolean().optional(),
    is_dynamic: zod_1.z.boolean().optional(),
    schema_name: zod_1.z.string(),
    name: zod_1.z.string(),
    slug: zod_1.z.string(),
    primary_key: zod_1.z.string(),
    custom: zod_1.z.any(),
    display_column: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string()), zod_1.z.undefined()]),
    display_name: zod_1.z.string().nullable(),
    display_primary_key: zod_1.z.boolean(),
    searchable_columns: zod_1.z.array(zod_1.z.string()).optional(),
    columns: exports.resourceColumnSchema.array(),
    associations: exports.resourceAssociationSchema.array(),
});
exports.getResourceInputSchema = zod_1.z.object({
    schemaName: zod_1.z.string(),
});
exports.getResourceDataInputSchema = zod_1.z.object({
    schemaName: zod_1.z.string(),
    id: zod_1.z.number().optional(),
    current: zod_1.z.number(),
    pageSize: zod_1.z.number(),
    sort: ag_grid_schema_1.agSortSchema,
    filterModel: ag_grid_schema_1.agFilterSchema,
});
exports.getResourceDataOutputInnerSchema = zod_1.z.object({
    pagination: zod_1.z.object({
        total: zod_1.z.number(),
    }),
    data: zod_1.z.array(zod_1.z.any()),
});
exports.getResourceDataOutputSchema = zod_1.z.union([
    exports.getResourceDataOutputInnerSchema, zod_1.z.unknown(),
]);
exports.putResourceDataInputSchema = zod_1.z.object({
    schemaName: zod_1.z.string(),
    id: zod_1.z.number(),
    updatedValue: zod_1.z.any(),
});
exports.resourceKeySchema = zod_1.z.object({
    origin: zod_1.z.string(),
    resource: zod_1.z.string(),
    resourceSchema: zod_1.z.string(),
    id: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).optional(),
});
//# sourceMappingURL=ui-schema.js.map