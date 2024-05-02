"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFormModelSymbol = exports.ThemeModelSymbol = exports.LoginModelSymbol = exports.WorkflowConfigModelSymbol = exports.PreviewModelSymbol = exports.GridModelSymbol = exports.TreeGridModelSymbol = exports.ApiServiceSymbol = exports.ServiceSymbol = void 0;
/**
 * getServices 方法会将 inversify module 转换成 nestjs module，这样 nestjs controller 就可以使用了
 * 所以，注意：如果不需要给 controller 使用，则不需要 bind
 */
exports.ServiceSymbol = Symbol('Service');
exports.ApiServiceSymbol = Symbol('ApiService');
exports.TreeGridModelSymbol = Symbol.for('TreeGridModel');
exports.GridModelSymbol = Symbol.for('GridModel');
exports.PreviewModelSymbol = Symbol.for('PreviewModel');
exports.WorkflowConfigModelSymbol = Symbol.for('WorkflowConfigModel');
exports.LoginModelSymbol = Symbol.for('LoginModel');
exports.ThemeModelSymbol = Symbol.for('ThemeModel');
exports.TaskFormModelSymbol = Symbol.for('TaskFormModel');
//# sourceMappingURL=symbols.js.map