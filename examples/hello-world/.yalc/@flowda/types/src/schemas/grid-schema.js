"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContextMenuInputSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
exports.handleContextMenuInputSchema = zod_1.z.object({
    uri: zod_1.z.string().describe('所属 Grid 的 uri'),
    value: zod_1.z.unknown().optional().describe('可选，如果不传则根据 uri/id/field 重新获取'),
    colDef: types_1.ColumnUISchema,
});
//# sourceMappingURL=grid-schema.js.map