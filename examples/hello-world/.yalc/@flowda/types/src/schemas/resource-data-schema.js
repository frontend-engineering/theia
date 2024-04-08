"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putResourceDataInputSchema = exports.getResourceDataOutputSchema = exports.getResourceDataOutputInnerSchema = exports.getResourceDataInputSchema = exports.getResourceInputSchema = void 0;
const zod_1 = require("zod");
const ag_grid_schema_1 = require("./ag-grid-schema");
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
//# sourceMappingURL=resource-data-schema.js.map