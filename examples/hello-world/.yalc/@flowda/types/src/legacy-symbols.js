"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomZodSchemaSymbol = exports.PrismaClientSymbol = void 0;
// schema.service data.service 依赖下面3个 toConstantValue
// todo: 后续开源相关服务后再同步调整
exports.PrismaClientSymbol = Symbol('PrismaClient');
exports.CustomZodSchemaSymbol = Symbol.for('CustomZodSchema');
//# sourceMappingURL=legacy-symbols.js.map