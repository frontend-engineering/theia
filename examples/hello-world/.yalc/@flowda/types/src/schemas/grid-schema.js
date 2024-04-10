"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContextMenuInputSchema = void 0;
const zod_1 = require("zod");
const ag_grid_schema_1 = require("./ag-grid-schema");
const types_1 = require("../types");
exports.handleContextMenuInputSchema = zod_1.z.object({
    uri: zod_1.z.string().describe('所属 Grid 的 uri'),
    cellRendererInput: ag_grid_schema_1.cellRendererInputSchema,
    column: types_1.ColumnUISchema
});
//# sourceMappingURL=grid-schema.js.map