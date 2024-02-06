import { z } from 'zod';
export const selectOptionSchema = z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
});
export const resourceAssociationSchema = z.object({
    foreign_key: z.string(),
    model_name: z.string(),
    primary_key: z.string(),
    name: z.string(),
    slug: z.string(),
    display_name: z.string(),
    schema_name: z.string(),
});
export const resourceColumnSchema = z.object({
    name: z.string(),
    access_type: z.enum(['read_only']).optional(),
    column_type: z.enum(['reference', 'string', 'tag', 'integer', 'datetime', 'textarea', 'boolean']),
    prisma: z.boolean().optional(),
    format: z
        .object({
        select_options: selectOptionSchema.array(),
    })
        .optional(),
    reference: z.object({
        model_name: z.string(),
        primary_key: z.string(),
        display_name: z.string(),
        display_column: z.union([z.string(), z.array(z.string()), z.undefined()]),
        'x-relationField': z.string(),
        'x-onSoftDelete': z.string(),
        'x-unique': z.boolean().optional(),
    }),
    display_name: z.string().optional(),
    validators: z.array(z.union([
        z.object({
            required: z.boolean(),
        }),
        z.object({
            format: z.string(),
            message: z.string(),
        }),
    ])),
});
export const resourceSchema = z.object({
    namespace: z.string().optional(),
    prisma: z.boolean().optional(),
    is_dynamic: z.boolean().optional(),
    schema_name: z.string(),
    name: z.string(),
    slug: z.string(),
    primary_key: z.string(),
    custom: z.any(),
    display_column: z.union([z.string(), z.array(z.string()), z.undefined()]),
    display_name: z.string().nullable(),
    display_primary_key: z.boolean(),
    searchable_columns: z.array(z.string()).optional(),
    columns: resourceColumnSchema.array(),
    associations: resourceAssociationSchema.array(),
    __jsonschema: z.any(),
});
export const agFilterInnerSchema = z.object({
    filterType: z.enum(['text', 'number']),
    type: z.enum(['contains', 'equals']),
    filter: z.union([z.string(), z.number()]),
});
export const agFilterInner2Schema = z.object({
    filterType: z.enum(['text']),
    operator: z.enum(['OR', 'AND']),
    conditions: z.array(agFilterInnerSchema),
});
export const agFilter1Schema = z.record(agFilterInnerSchema);
export const agFilter2Schema = z.record(agFilterInner2Schema);
export const agFilterSchema = z.record(z.union([agFilterInnerSchema, agFilterInner2Schema]));
export const agSortSchema = z.array(z.object({
    colId: z.string(),
    sort: z.enum(['asc', 'desc']),
}));
export const prismaFilterSchema = z.object({
    OR: z.array(z.record(z.record(z.enum(['contains']), z.string()))),
});
//# sourceMappingURL=schema.js.map