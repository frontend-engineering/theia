"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cellRendererInputSchema = exports.agSortSchema = exports.agFilterSchema = exports.agFilterInner2Schema = exports.agFilterInnerSchema = void 0;
const zod_1 = require("zod");
exports.agFilterInnerSchema = zod_1.z.object({
    filterType: zod_1.z.enum(['text', 'number']),
    // filterType: z.string(),
    type: zod_1.z.enum(['contains', 'equals']),
    // type: z.string(),
    filter: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]),
});
exports.agFilterInner2Schema = zod_1.z.object({
    filterType: zod_1.z.enum(['text']),
    // filterType: z.string(),
    operator: zod_1.z.enum(['OR', 'AND']),
    // operator: z.string(),
    conditions: zod_1.z.array(exports.agFilterInnerSchema),
});
exports.agFilterSchema = zod_1.z
    .record(exports.agFilterInnerSchema.or(exports.agFilterInner2Schema))
    .or(zod_1.z.object({ _ref: zod_1.z.string().optional() }));
exports.agSortSchema = zod_1.z.array(zod_1.z.object({
    colId: zod_1.z.string(),
    sort: zod_1.z.enum(['asc', 'desc']),
}));
exports.cellRendererInputSchema = zod_1.z.object({
    value: zod_1.z.any(),
    data: zod_1.z.object({
        id: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).transform(arg => arg.toString())
    }),
    valueFormatted: zod_1.z.string(),
    colDef: zod_1.z.object({
        field: zod_1.z.string(),
    }),
});
//# sourceMappingURL=ag-grid-schema.js.map