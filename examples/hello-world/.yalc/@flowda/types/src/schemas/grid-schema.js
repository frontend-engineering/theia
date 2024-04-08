"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContextMenuInputSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
exports.handleContextMenuInputSchema = zod_1.z.object({
    colDef: types_1.ColumnUISchema,
    value: zod_1.z.unknown(),
});
//# sourceMappingURL=grid-schema.js.map