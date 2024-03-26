"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSortAgToMotor = void 0;
function convertSortAgToMotor(sort) {
    return sort[0] != null ? (sort[0].sort === 'asc' ? sort[0].colId : '-' + sort[0].colId) : undefined;
}
exports.convertSortAgToMotor = convertSortAgToMotor;
//# sourceMappingURL=ag-grid-utils.js.map