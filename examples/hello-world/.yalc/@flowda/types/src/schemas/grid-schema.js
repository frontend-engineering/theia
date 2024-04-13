"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeGridUriQuerySchema = exports.handleContextMenuInputSchema = void 0;
const zod_1 = require("zod");
const ag_grid_schema_1 = require("./ag-grid-schema");
const types_1 = require("../types");
exports.handleContextMenuInputSchema = zod_1.z.object({
    uri: zod_1.z.string().describe('所属 Grid 的 uri'),
    cellRendererInput: ag_grid_schema_1.cellRendererInputSchema,
    column: types_1.ColumnUISchema.optional(),
    association: types_1.AssociationKeySchema.optional()
});
exports.treeGridUriQuerySchema = zod_1.z.object({
    schemaName: zod_1.z.string(),
    displayName: zod_1.z.string(),
    id: zod_1.z.string(),
    field: zod_1.z.string()
});
//# sourceMappingURL=grid-schema.js.map