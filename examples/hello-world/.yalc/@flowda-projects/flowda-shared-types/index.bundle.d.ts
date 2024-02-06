import { z } from 'zod';

declare const PrismaSchemaServiceSymbol: unique symbol;
declare const SchemaTransformerSymbol: unique symbol;
declare const PrismaUtilsSymbol: unique symbol;
declare const DataServiceSymbol: unique symbol;
declare const SchemaServiceSymbol: unique symbol;
declare const DynamicTableSchemaTransformerSymbol: unique symbol;
declare const FlowdaTrpcClientSymbol: unique symbol;
declare const FlowdaGatewayTrpcClientSymbol: unique symbol;

declare const PrismaClientSymbol: unique symbol;
/**
 * getServices 方法会将 inversify module 转换成 nestjs module，这样 nestjs controller 就可以使用了
 * 所以，注意：如果不需要给 controller 使用，则不需要 bind
 */
declare const ServiceSymbol: unique symbol;
declare const APISymbol: unique symbol;
declare const URLSymbol: unique symbol;
declare const ENVSymbol: unique symbol;
declare const PrismaZodSchemaSymbol: unique symbol;
declare const CustomZodSchemaSymbol: unique symbol;
declare const K3CloudIdentifyInfoSymbol: unique symbol;
type TFilterFormValue = string | {
    column: string | undefined;
    condition: string | undefined;
    value: string | undefined;
};
declare const COSSymbol: unique symbol;

declare const selectOptionSchema: z.ZodObject<{
    value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    label: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string | number;
    label: string;
}, {
    value: string | number;
    label: string;
}>;
declare const resourceAssociationSchema: z.ZodObject<{
    foreign_key: z.ZodString;
    model_name: z.ZodString;
    primary_key: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    display_name: z.ZodString;
    schema_name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    foreign_key: string;
    model_name: string;
    primary_key: string;
    name: string;
    slug: string;
    display_name: string;
    schema_name: string;
}, {
    foreign_key: string;
    model_name: string;
    primary_key: string;
    name: string;
    slug: string;
    display_name: string;
    schema_name: string;
}>;
declare const resourceColumnSchema: z.ZodObject<{
    name: z.ZodString;
    access_type: z.ZodOptional<z.ZodEnum<["read_only"]>>;
    column_type: z.ZodEnum<["reference", "string", "tag", "integer", "datetime", "textarea", "boolean"]>;
    prisma: z.ZodOptional<z.ZodBoolean>;
    format: z.ZodOptional<z.ZodObject<{
        select_options: z.ZodArray<z.ZodObject<{
            value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            label: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string | number;
            label: string;
        }, {
            value: string | number;
            label: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        select_options: {
            value: string | number;
            label: string;
        }[];
    }, {
        select_options: {
            value: string | number;
            label: string;
        }[];
    }>>;
    reference: z.ZodObject<{
        model_name: z.ZodString;
        primary_key: z.ZodString;
        display_name: z.ZodString;
        display_column: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>;
        'x-relationField': z.ZodString;
        'x-onSoftDelete': z.ZodString;
        'x-unique': z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
    }, {
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
    }>;
    display_name: z.ZodOptional<z.ZodString>;
    validators: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        required: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        required: boolean;
    }, {
        required: boolean;
    }>, z.ZodObject<{
        format: z.ZodString;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        format: string;
    }, {
        message: string;
        format: string;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    display_name?: string | undefined;
    access_type?: "read_only" | undefined;
    prisma?: boolean | undefined;
    format?: {
        select_options: {
            value: string | number;
            label: string;
        }[];
    } | undefined;
    name: string;
    column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
    reference: {
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
    };
    validators: ({
        required: boolean;
    } | {
        message: string;
        format: string;
    })[];
}, {
    display_name?: string | undefined;
    access_type?: "read_only" | undefined;
    prisma?: boolean | undefined;
    format?: {
        select_options: {
            value: string | number;
            label: string;
        }[];
    } | undefined;
    name: string;
    column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
    reference: {
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
    };
    validators: ({
        required: boolean;
    } | {
        message: string;
        format: string;
    })[];
}>;
declare const resourceSchema: z.ZodObject<{
    namespace: z.ZodOptional<z.ZodString>;
    prisma: z.ZodOptional<z.ZodBoolean>;
    is_dynamic: z.ZodOptional<z.ZodBoolean>;
    schema_name: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    primary_key: z.ZodString;
    custom: z.ZodAny;
    display_column: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>;
    display_name: z.ZodNullable<z.ZodString>;
    display_primary_key: z.ZodBoolean;
    searchable_columns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    columns: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        access_type: z.ZodOptional<z.ZodEnum<["read_only"]>>;
        column_type: z.ZodEnum<["reference", "string", "tag", "integer", "datetime", "textarea", "boolean"]>;
        prisma: z.ZodOptional<z.ZodBoolean>;
        format: z.ZodOptional<z.ZodObject<{
            select_options: z.ZodArray<z.ZodObject<{
                value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                label: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                value: string | number;
                label: string;
            }, {
                value: string | number;
                label: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            select_options: {
                value: string | number;
                label: string;
            }[];
        }, {
            select_options: {
                value: string | number;
                label: string;
            }[];
        }>>;
        reference: z.ZodObject<{
            model_name: z.ZodString;
            primary_key: z.ZodString;
            display_name: z.ZodString;
            display_column: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>;
            'x-relationField': z.ZodString;
            'x-onSoftDelete': z.ZodString;
            'x-unique': z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
        }, {
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
        }>;
        display_name: z.ZodOptional<z.ZodString>;
        validators: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            required: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            required: boolean;
        }, {
            required: boolean;
        }>, z.ZodObject<{
            format: z.ZodString;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
            format: string;
        }, {
            message: string;
            format: string;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        display_name?: string | undefined;
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
        reference: {
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
        };
        validators: ({
            required: boolean;
        } | {
            message: string;
            format: string;
        })[];
    }, {
        display_name?: string | undefined;
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
        reference: {
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
        };
        validators: ({
            required: boolean;
        } | {
            message: string;
            format: string;
        })[];
    }>, "many">;
    associations: z.ZodArray<z.ZodObject<{
        foreign_key: z.ZodString;
        model_name: z.ZodString;
        primary_key: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        display_name: z.ZodString;
        schema_name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        foreign_key: string;
        model_name: string;
        primary_key: string;
        name: string;
        slug: string;
        display_name: string;
        schema_name: string;
    }, {
        foreign_key: string;
        model_name: string;
        primary_key: string;
        name: string;
        slug: string;
        display_name: string;
        schema_name: string;
    }>, "many">;
    __jsonschema: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    custom?: any;
    prisma?: boolean | undefined;
    display_column?: string | string[] | undefined;
    namespace?: string | undefined;
    is_dynamic?: boolean | undefined;
    searchable_columns?: string[] | undefined;
    __jsonschema?: any;
    primary_key: string;
    name: string;
    slug: string;
    display_name: string | null;
    schema_name: string;
    display_primary_key: boolean;
    columns: {
        display_name?: string | undefined;
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
        reference: {
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
        };
        validators: ({
            required: boolean;
        } | {
            message: string;
            format: string;
        })[];
    }[];
    associations: {
        foreign_key: string;
        model_name: string;
        primary_key: string;
        name: string;
        slug: string;
        display_name: string;
        schema_name: string;
    }[];
}, {
    custom?: any;
    prisma?: boolean | undefined;
    display_column?: string | string[] | undefined;
    namespace?: string | undefined;
    is_dynamic?: boolean | undefined;
    searchable_columns?: string[] | undefined;
    __jsonschema?: any;
    primary_key: string;
    name: string;
    slug: string;
    display_name: string | null;
    schema_name: string;
    display_primary_key: boolean;
    columns: {
        display_name?: string | undefined;
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
        reference: {
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
        };
        validators: ({
            required: boolean;
        } | {
            message: string;
            format: string;
        })[];
    }[];
    associations: {
        foreign_key: string;
        model_name: string;
        primary_key: string;
        name: string;
        slug: string;
        display_name: string;
        schema_name: string;
    }[];
}>;
declare const agFilterInnerSchema: z.ZodObject<{
    filterType: z.ZodEnum<["text", "number"]>;
    type: z.ZodEnum<["contains", "equals"]>;
    filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}>;
declare const agFilterInner2Schema: z.ZodObject<{
    filterType: z.ZodEnum<["text"]>;
    operator: z.ZodEnum<["OR", "AND"]>;
    conditions: z.ZodArray<z.ZodObject<{
        filterType: z.ZodEnum<["text", "number"]>;
        type: z.ZodEnum<["contains", "equals"]>;
        filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}>;
declare const agFilter1Schema: z.ZodRecord<z.ZodString, z.ZodObject<{
    filterType: z.ZodEnum<["text", "number"]>;
    type: z.ZodEnum<["contains", "equals"]>;
    filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}>>;
type TAgFilter1Schema = z.infer<typeof agFilter1Schema>;
declare const agFilter2Schema: z.ZodRecord<z.ZodString, z.ZodObject<{
    filterType: z.ZodEnum<["text"]>;
    operator: z.ZodEnum<["OR", "AND"]>;
    conditions: z.ZodArray<z.ZodObject<{
        filterType: z.ZodEnum<["text", "number"]>;
        type: z.ZodEnum<["contains", "equals"]>;
        filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}>>;
declare const agFilterSchema: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
    filterType: z.ZodEnum<["text", "number"]>;
    type: z.ZodEnum<["contains", "equals"]>;
    filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}>, z.ZodObject<{
    filterType: z.ZodEnum<["text"]>;
    operator: z.ZodEnum<["OR", "AND"]>;
    conditions: z.ZodArray<z.ZodObject<{
        filterType: z.ZodEnum<["text", "number"]>;
        type: z.ZodEnum<["contains", "equals"]>;
        filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}>]>>;
type TAgFilterSchema = z.infer<typeof agFilterSchema>;
declare const agSortSchema: z.ZodArray<z.ZodObject<{
    colId: z.ZodString;
    sort: z.ZodEnum<["asc", "desc"]>;
}, "strip", z.ZodTypeAny, {
    sort: "asc" | "desc";
    colId: string;
}, {
    sort: "asc" | "desc";
    colId: string;
}>, "many">;
type TAgSortSchema = z.infer<typeof agSortSchema>;
declare const prismaFilterSchema: z.ZodObject<{
    OR: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodEnum<["contains"]>, z.ZodString>>, "many">;
}, "strip", z.ZodTypeAny, {
    OR: Record<string, Partial<Record<"contains", string>>>[];
}, {
    OR: Record<string, Partial<Record<"contains", string>>>[];
}>;
type IPrismaFilterSchema = z.infer<typeof prismaFilterSchema>;
type IResourceSchema = z.infer<typeof resourceSchema>;
type IResourceAssociationSchema = z.infer<typeof resourceAssociationSchema>;
type ISchemaSelectOption = z.infer<typeof selectOptionSchema>;
type IResourceColumnSchema = z.infer<typeof resourceColumnSchema>;

export { APISymbol, COSSymbol, CustomZodSchemaSymbol, DataServiceSymbol, DynamicTableSchemaTransformerSymbol, ENVSymbol, FlowdaGatewayTrpcClientSymbol, FlowdaTrpcClientSymbol, type IPrismaFilterSchema, type IResourceAssociationSchema, type IResourceColumnSchema, type IResourceSchema, type ISchemaSelectOption, K3CloudIdentifyInfoSymbol, PrismaClientSymbol, PrismaSchemaServiceSymbol, PrismaUtilsSymbol, PrismaZodSchemaSymbol, SchemaServiceSymbol, SchemaTransformerSymbol, ServiceSymbol, type TAgFilter1Schema, type TAgFilterSchema, type TAgSortSchema, type TFilterFormValue, URLSymbol, agFilter1Schema, agFilter2Schema, agFilterInner2Schema, agFilterInnerSchema, agFilterSchema, agSortSchema, prismaFilterSchema, resourceAssociationSchema, resourceColumnSchema, resourceSchema, selectOptionSchema };
