"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wfCfgSchema = exports.taskUriOutputSchema = exports.taskUriInputSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
exports.taskSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    assignee: zod_1.z.string(),
    executionId: zod_1.z.string(),
    processDefinitionId: zod_1.z.string(),
    processInstanceId: zod_1.z.string(),
    taskDefinitionKey: zod_1.z.string(),
    tenantId: zod_1.z.string(),
});
// 可能后续再增加 或者先请求一次后端
exports.taskUriInputSchema = exports.taskSchema.pick({
    id: true,
    name: true,
    taskDefinitionKey: true
});
// displayName 是为了兼容 getUriDisplayName()
exports.taskUriOutputSchema = zod_1.z.object({
    taskId: zod_1.z.string(),
    displayName: zod_1.z.string(),
    taskDefinitionKey: zod_1.z.string()
});
// 逐步增强，现在仅支持单个 resource 
// 后续可支持多个，且不仅仅是 resource 可以是 view 甚至 plugin
exports.wfCfgSchema = zod_1.z.array(zod_1.z.object({
    taskDefinitionKey: zod_1.z.string(),
    resource: zod_1.z.object({
        schemaName: zod_1.z.string(),
        inputMap: zod_1.z.record(zod_1.z.string(), zod_1.z.string()),
        columns: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            access_type: zod_1.z.union([zod_1.z.literal('read_only'), zod_1.z.literal('read_write')])
        }))
    })
}));
//# sourceMappingURL=workflow-schema.js.map