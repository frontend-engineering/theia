'use strict';

var zod = require('zod');

/**
 * getServices 方法会将 inversify module 转换成 nestjs module，这样 nestjs controller 就可以使用了
 * 所以，注意：如果不需要给 controller 使用，则不需要 bind
 */
const ServiceSymbol = Symbol('Service');
const ApiServiceSymbol = Symbol('ApiService');
const TreeGridModelSymbol = Symbol.for('TreeGridModel');
const GridModelSymbol = Symbol.for('GridModel');
const PreviewModelSymbol = Symbol.for('PreviewModel');
const WorkflowConfigModelSymbol = Symbol.for('WorkflowConfigModel');
const LoginModelSymbol = Symbol.for('LoginModel');
const ThemeModelSymbol = Symbol.for('ThemeModel');
const TaskFormModelSymbol = Symbol.for('TaskFormModel');
const WorkflowConfigSymbol = Symbol.for('WorkflowConfig');

// schema.service data.service 依赖下面3个 toConstantValue
// todo: 后续开源相关服务后再同步调整
const PrismaClientSymbol = Symbol('PrismaClient');
const CustomZodSchemaSymbol = Symbol.for('CustomZodSchema');

const agFilterInnerSchema = zod.z.object({
    filterType: zod.z.enum(['text', 'number']),
    // filterType: z.string(),
    type: zod.z.enum(['contains', 'equals']),
    // type: z.string(),
    filter: zod.z.union([zod.z.string(), zod.z.number()]),
});
const agFilterInner2Schema = zod.z.object({
    filterType: zod.z.enum(['text']),
    // filterType: z.string(),
    operator: zod.z.enum(['OR', 'AND']),
    // operator: z.string(),
    conditions: zod.z.array(agFilterInnerSchema),
});
const agFilterSchema = zod.z.record(agFilterInnerSchema.or(agFilterInner2Schema));
const agSortSchema = zod.z.array(zod.z.object({
    colId: zod.z.string(),
    sort: zod.z.enum(['asc', 'desc']),
}));
const cellRendererInputSchema = zod.z.object({
    value: zod.z.any(),
    // data: z.object({
    //   id: z.union([z.string(), z.number()]).transform(arg => arg.toString())
    // }),
    data: zod.z.unknown(),
    valueFormatted: zod.z.string().nullable(),
    colDef: zod.z.object({
        field: zod.z.string(),
    }),
});

function createZodDto(schema) {
    class AugmentedZodDto {
        static create(input) {
            return this.schema.parse(input);
        }
    }
    AugmentedZodDto.isZodDto = true;
    AugmentedZodDto.schema = schema;
    return AugmentedZodDto;
}

const loginInputSchema = zod.z.object({
    username: zod.z.string(),
    password: zod.z.string().min(4),
});
class loginInputSchemaDto extends createZodDto(loginInputSchema) {
}
const loginOutputSchema = zod.z.object({
    at: zod.z.object({
        token: zod.z.string()
    })
});
class loginOutputSchemaDto extends createZodDto(loginOutputSchema) {
}

const ColumnKeySchema = zod.z.object({
    column_type: zod.z.string(),
    display_name: zod.z.string(),
    description: zod.z.string().optional(),
    example: zod.z.string().optional(),
    visible: zod.z.boolean(),
    access_type: zod.z.union([zod.z.literal('read_only'), zod.z.literal('read_write')]).default('read_write'),
    plugins: zod.z.any().optional(),
});
const AssociationKeySchema = zod.z.object({
    display_name: zod.z.string(),
    slug: zod.z.string(),
    model_name: zod.z.string(),
    foreign_key: zod.z.string(),
    primary_key: zod.z.string(),
    visible: zod.z.boolean(),
});
const ReferenceKeySchema = zod.z.union([
    zod.z.object({
        display_name: zod.z.string(),
        model_name: zod.z.string(),
        reference_type: zod.z.literal('belongs_to'),
        foreign_key: zod.z.string(),
        primary_key: zod.z.string(),
    }),
    zod.z.object({
        display_name: zod.z.string(),
        model_name: zod.z.string(),
        reference_type: zod.z.literal('has_one'),
        foreign_key: zod.z.string(),
        primary_key: zod.z.string(),
        visible: zod.z.boolean(),
    }),
]);
const ResourceKeySchema = zod.z.object({
    name: zod.z.string(),
    slug: zod.z.string(),
    table_name: zod.z.string(),
    class_name: zod.z.string(),
    display_name: zod.z.string(),
    primary_key: zod.z.string().nullable(),
    visible: zod.z.boolean(),
    display_primary_key: zod.z.string(),
    display_column: zod.z.string().optional(),
    searchable_columns: zod.z.string().optional(),
    plugins: zod.z.any().optional(),
    // openapi3-ts
    properties: zod.z.record(zod.z.string(), zod.z.union([ColumnKeySchema, AssociationKeySchema, ReferenceKeySchema]))
        .optional(),
    required: zod.z.array(zod.z.string()).optional(),
});

const ColumnUISchema = ColumnKeySchema.extend({
    name: zod.z.string(),
    validators: zod.z.array(zod.z.unknown()),
    reference: ReferenceKeySchema.optional(),
});
const ResourceUISchema = ResourceKeySchema.omit({
    properties: true,
    required: true,
}).extend({
    namespace: zod.z.string().describe('网关作为命名空间'),
    columns: zod.z.array(ColumnUISchema),
    associations: zod.z.array(AssociationKeySchema),
});

const handleContextMenuInputSchema = zod.z.object({
    uri: zod.z.string().describe('所属 Grid 的 uri'),
    cellRendererInput: cellRendererInputSchema,
    column: ColumnUISchema.optional(),
    association: AssociationKeySchema.optional()
});
const treeGridUriQuerySchema = zod.z.object({
    schemaName: zod.z.string(),
    displayName: zod.z.string(),
    id: zod.z.string(),
    field: zod.z.string()
});

// todo: 后续开源相关服务后再同步调整
const selectOptionSchema = zod.z.object({
    value: zod.z.union([zod.z.string(), zod.z.number()]),
    label: zod.z.string(),
});
const resourceKeySchema = zod.z.object({
    origin: zod.z.string(),
    resource: zod.z.string(),
    resourceSchema: zod.z.string(),
    id: zod.z.union([zod.z.string(), zod.z.number()]).optional(),
});
const getDataSchema = zod.z.object({
    user: zod.z.any(),
    path: zod.z.string(),
    query: zod.z.any(),
});
const putDataSchema = zod.z.object({
    user: zod.z.any(),
    path: zod.z.string(),
    values: zod.z.any(),
});

const getResourceInputSchema = zod.z.object({
    schemaName: zod.z.string(),
});
const findManyResourceDataInputSchema = zod.z.object({
    schemaName: zod.z.string(),
    current: zod.z.number(),
    pageSize: zod.z.number(),
    sort: agSortSchema,
    filterModel: agFilterSchema,
});
const findUniqueResourceDataInputSchema = zod.z.object({
    schemaName: zod.z.string(),
    id: zod.z.number(),
});
const getResourceDataInputSchema = zod.z.union([
    findManyResourceDataInputSchema,
    findUniqueResourceDataInputSchema
]);
const getResourceDataOutputInnerSchema = zod.z.object({
    pagination: zod.z.object({
        total: zod.z.number(),
    }),
    data: zod.z.array(zod.z.any()),
});
const getResourceDataOutputSchema = zod.z.union([
    getResourceDataOutputInnerSchema, zod.z.unknown(),
]);
const putResourceDataInputSchema = zod.z.object({
    schemaName: zod.z.string(),
    id: zod.z.number(),
    updatedValue: zod.z.any(),
});

// https://github.com/colinhacks/zod/discussions/2245
const baseMenuItemSchema = zod.z.object({
    name: zod.z.string(),
    slug: zod.z.string(),
    id: zod.z.string(),
    icon: zod.z.string().optional()
});
const menuItemSchema = baseMenuItemSchema.extend({
    children: zod.z.lazy(() => menuItemSchema.array().optional()),
    parent: zod.z.lazy(() => menuItemSchema.optional()),
});
const agMenuItemSchema = baseMenuItemSchema.extend({
    hierarchy: zod.z.array(zod.z.string())
});

const ctxTenantSchema = zod.z.object({
    id: zod.z.number(),
    name: zod.z.string(),
});
class ctxTenantSchemaDto extends createZodDto(ctxTenantSchema) {
}
const ctxUserSchema = zod.z.object({
    id: zod.z.number(),
    tenantId: zod.z.number(),
    username: zod.z.string(),
});
class ctxUserSchemaDto extends createZodDto(ctxUserSchema) {
}

const taskSchema = zod.z.object({
    id: zod.z.string(),
    name: zod.z.string(),
    assignee: zod.z.string(),
    executionId: zod.z.string(),
    processDefinitionId: zod.z.string(),
    processInstanceId: zod.z.string(),
    taskDefinitionKey: zod.z.string(),
    tenantId: zod.z.string(),
});
// 可能后续再增加 或者先请求一次后端
const taskUriInputSchema = taskSchema.pick({
    id: true,
    name: true,
    taskDefinitionKey: true
});
// displayName 是为了兼容 getUriDisplayName()
const taskUriOutputSchema = zod.z.object({
    taskId: zod.z.string(),
    displayName: zod.z.string(),
    taskDefinitionKey: zod.z.string()
});
// 逐步增强，现在仅支持单个 resource 
// 后续可支持多个，且不仅仅是 resource 可以是 view 甚至 plugin
const wfCfgSchema = zod.z.array(zod.z.object({
    taskDefinitionKey: zod.z.string(),
    resource: zod.z.object({
        schemaName: zod.z.string(),
        inputMap: zod.z.record(zod.z.string(), zod.z.string()),
        columns: zod.z.array(zod.z.object({
            name: zod.z.string(),
            access_type: zod.z.union([zod.z.literal('read_only'), zod.z.literal('read_write')])
        }))
    })
}));

const builtinPluginSchema = zod.z.object({
    axios: zod.z.object({
        method: zod.z.string(),
        url: zod.z.string(),
        data: zod.z.any(),
    }).optional(),
    open_task: zod.z.boolean().optional()
});

exports.ApiServiceSymbol = ApiServiceSymbol;
exports.AssociationKeySchema = AssociationKeySchema;
exports.ColumnKeySchema = ColumnKeySchema;
exports.ColumnUISchema = ColumnUISchema;
exports.CustomZodSchemaSymbol = CustomZodSchemaSymbol;
exports.GridModelSymbol = GridModelSymbol;
exports.LoginModelSymbol = LoginModelSymbol;
exports.PreviewModelSymbol = PreviewModelSymbol;
exports.PrismaClientSymbol = PrismaClientSymbol;
exports.ReferenceKeySchema = ReferenceKeySchema;
exports.ResourceKeySchema = ResourceKeySchema;
exports.ResourceUISchema = ResourceUISchema;
exports.ServiceSymbol = ServiceSymbol;
exports.TaskFormModelSymbol = TaskFormModelSymbol;
exports.ThemeModelSymbol = ThemeModelSymbol;
exports.TreeGridModelSymbol = TreeGridModelSymbol;
exports.WorkflowConfigModelSymbol = WorkflowConfigModelSymbol;
exports.WorkflowConfigSymbol = WorkflowConfigSymbol;
exports.agFilterInner2Schema = agFilterInner2Schema;
exports.agFilterInnerSchema = agFilterInnerSchema;
exports.agFilterSchema = agFilterSchema;
exports.agMenuItemSchema = agMenuItemSchema;
exports.agSortSchema = agSortSchema;
exports.baseMenuItemSchema = baseMenuItemSchema;
exports.builtinPluginSchema = builtinPluginSchema;
exports.cellRendererInputSchema = cellRendererInputSchema;
exports.ctxTenantSchema = ctxTenantSchema;
exports.ctxTenantSchemaDto = ctxTenantSchemaDto;
exports.ctxUserSchema = ctxUserSchema;
exports.ctxUserSchemaDto = ctxUserSchemaDto;
exports.findManyResourceDataInputSchema = findManyResourceDataInputSchema;
exports.findUniqueResourceDataInputSchema = findUniqueResourceDataInputSchema;
exports.getDataSchema = getDataSchema;
exports.getResourceDataInputSchema = getResourceDataInputSchema;
exports.getResourceDataOutputInnerSchema = getResourceDataOutputInnerSchema;
exports.getResourceDataOutputSchema = getResourceDataOutputSchema;
exports.getResourceInputSchema = getResourceInputSchema;
exports.handleContextMenuInputSchema = handleContextMenuInputSchema;
exports.loginInputSchema = loginInputSchema;
exports.loginInputSchemaDto = loginInputSchemaDto;
exports.loginOutputSchema = loginOutputSchema;
exports.loginOutputSchemaDto = loginOutputSchemaDto;
exports.menuItemSchema = menuItemSchema;
exports.putDataSchema = putDataSchema;
exports.putResourceDataInputSchema = putResourceDataInputSchema;
exports.resourceKeySchema = resourceKeySchema;
exports.selectOptionSchema = selectOptionSchema;
exports.taskSchema = taskSchema;
exports.taskUriInputSchema = taskUriInputSchema;
exports.taskUriOutputSchema = taskUriOutputSchema;
exports.treeGridUriQuerySchema = treeGridUriQuerySchema;
exports.wfCfgSchema = wfCfgSchema;
