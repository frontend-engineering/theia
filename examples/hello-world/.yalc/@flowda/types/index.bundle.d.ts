import { ZodTypeDef, ZodSchema, z } from 'zod';

type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;
interface JSONObject {
    [x: string]: JSONValue;
}

declare const GridModelSymbol: unique symbol;
declare const PreviewModelSymbol: unique symbol;
declare const LoginModelSymbol: unique symbol;

interface ZodDto<TOutput = any, TDef extends ZodTypeDef = ZodTypeDef, TInput = TOutput> {
    new (): TOutput;
    isZodDto: true;
    schema: ZodSchema<TOutput, TDef, TInput>;
    create(input: unknown): TOutput;
}

declare const loginInputSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
declare const loginInputSchemaDto_base: ZodDto<{
    username: string;
    password: string;
}, z.ZodObjectDef<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    username: string;
    password: string;
}>;
declare class loginInputSchemaDto extends loginInputSchemaDto_base {
}
declare const loginOutputSchema: z.ZodObject<{
    at: z.ZodObject<{
        token: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        token: string;
    }, {
        token: string;
    }>;
}, "strip", z.ZodTypeAny, {
    at: {
        token: string;
    };
}, {
    at: {
        token: string;
    };
}>;
declare const loginOutputSchemaDto_base: ZodDto<{
    at: {
        token: string;
    };
}, z.ZodObjectDef<{
    at: z.ZodObject<{
        token: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        token: string;
    }, {
        token: string;
    }>;
}, "strip", z.ZodTypeAny>, {
    at: {
        token: string;
    };
}>;
declare class loginOutputSchemaDto extends loginOutputSchemaDto_base {
}

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
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
    }, {
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
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
    name: string;
    column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
    reference: {
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
    };
    validators: ({
        required: boolean;
    } | {
        message: string;
        format: string;
    })[];
    access_type?: "read_only" | undefined;
    prisma?: boolean | undefined;
    format?: {
        select_options: {
            value: string | number;
            label: string;
        }[];
    } | undefined;
    display_name?: string | undefined;
}, {
    name: string;
    column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
    reference: {
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
    };
    validators: ({
        required: boolean;
    } | {
        message: string;
        format: string;
    })[];
    access_type?: "read_only" | undefined;
    prisma?: boolean | undefined;
    format?: {
        select_options: {
            value: string | number;
            label: string;
        }[];
    } | undefined;
    display_name?: string | undefined;
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
    name: string;
    model_name: string;
    primary_key: string;
    display_name: string;
    foreign_key: string;
    slug: string;
    schema_name: string;
}, {
    name: string;
    model_name: string;
    primary_key: string;
    display_name: string;
    foreign_key: string;
    slug: string;
    schema_name: string;
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
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
        }, {
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
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
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
        reference: {
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
        };
        validators: ({
            required: boolean;
        } | {
            message: string;
            format: string;
        })[];
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        display_name?: string | undefined;
    }, {
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
        reference: {
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
        };
        validators: ({
            required: boolean;
        } | {
            message: string;
            format: string;
        })[];
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        display_name?: string | undefined;
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
        name: string;
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        schema_name: string;
    }, {
        name: string;
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        schema_name: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    primary_key: string;
    display_name: string | null;
    slug: string;
    schema_name: string;
    display_primary_key: boolean;
    columns: {
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
        reference: {
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
        };
        validators: ({
            required: boolean;
        } | {
            message: string;
            format: string;
        })[];
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        display_name?: string | undefined;
    }[];
    associations: {
        name: string;
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        schema_name: string;
    }[];
    namespace?: string | undefined;
    prisma?: boolean | undefined;
    is_dynamic?: boolean | undefined;
    custom?: any;
    display_column?: string | string[] | undefined;
    searchable_columns?: string[] | undefined;
}, {
    name: string;
    primary_key: string;
    display_name: string | null;
    slug: string;
    schema_name: string;
    display_primary_key: boolean;
    columns: {
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
        reference: {
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
        };
        validators: ({
            required: boolean;
        } | {
            message: string;
            format: string;
        })[];
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        display_name?: string | undefined;
    }[];
    associations: {
        name: string;
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        schema_name: string;
    }[];
    namespace?: string | undefined;
    prisma?: boolean | undefined;
    is_dynamic?: boolean | undefined;
    custom?: any;
    display_column?: string | string[] | undefined;
    searchable_columns?: string[] | undefined;
}>;
declare const getResourceInputSchema: z.ZodObject<{
    schemaName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schemaName: string;
}, {
    schemaName: string;
}>;
declare const getResourceDataInputSchema: z.ZodObject<{
    schemaName: z.ZodString;
    id: z.ZodOptional<z.ZodNumber>;
    current: z.ZodNumber;
    pageSize: z.ZodNumber;
    sort: z.ZodArray<z.ZodObject<{
        colId: z.ZodString;
        sort: z.ZodEnum<["asc", "desc"]>;
    }, "strip", z.ZodTypeAny, {
        sort: "asc" | "desc";
        colId: string;
    }, {
        sort: "asc" | "desc";
        colId: string;
    }>, "many">;
    filterModel: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
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
    }>]>>, z.ZodObject<{
        _ref: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        _ref?: string | undefined;
    }, {
        _ref?: string | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
    schemaName: string;
    current: number;
    pageSize: number;
    filterModel: (Record<string, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    } | {
        filterType: "text";
        operator: "OR" | "AND";
        conditions: {
            filter: string | number;
            type: "contains" | "equals";
            filterType: "number" | "text";
        }[];
    }> | {
        _ref?: string | undefined;
    }) & (Record<string, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    } | {
        filterType: "text";
        operator: "OR" | "AND";
        conditions: {
            filter: string | number;
            type: "contains" | "equals";
            filterType: "number" | "text";
        }[];
    }> | {
        _ref?: string | undefined;
    } | undefined);
    id?: number | undefined;
}, {
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
    schemaName: string;
    current: number;
    pageSize: number;
    filterModel: (Record<string, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    } | {
        filterType: "text";
        operator: "OR" | "AND";
        conditions: {
            filter: string | number;
            type: "contains" | "equals";
            filterType: "number" | "text";
        }[];
    }> | {
        _ref?: string | undefined;
    }) & (Record<string, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    } | {
        filterType: "text";
        operator: "OR" | "AND";
        conditions: {
            filter: string | number;
            type: "contains" | "equals";
            filterType: "number" | "text";
        }[];
    }> | {
        _ref?: string | undefined;
    } | undefined);
    id?: number | undefined;
}>;
declare const getResourceDataOutputInnerSchema: z.ZodObject<{
    pagination: z.ZodObject<{
        total: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        total: number;
    }, {
        total: number;
    }>;
    data: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    data: any[];
    pagination: {
        total: number;
    };
}, {
    data: any[];
    pagination: {
        total: number;
    };
}>;
declare const getResourceDataOutputSchema: z.ZodUnion<[z.ZodObject<{
    pagination: z.ZodObject<{
        total: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        total: number;
    }, {
        total: number;
    }>;
    data: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    data: any[];
    pagination: {
        total: number;
    };
}, {
    data: any[];
    pagination: {
        total: number;
    };
}>, z.ZodUnknown]>;
declare const putResourceDataInputSchema: z.ZodObject<{
    schemaName: z.ZodString;
    id: z.ZodNumber;
    updatedValue: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    schemaName: string;
    id: number;
    updatedValue?: any;
}, {
    schemaName: string;
    id: number;
    updatedValue?: any;
}>;
declare const resourceKeySchema: z.ZodObject<{
    origin: z.ZodString;
    resource: z.ZodString;
    resourceSchema: z.ZodString;
    id: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
}, "strip", z.ZodTypeAny, {
    origin: string;
    resource: string;
    resourceSchema: string;
    id?: string | number | undefined;
}, {
    origin: string;
    resource: string;
    resourceSchema: string;
    id?: string | number | undefined;
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
declare const agFilterSchema: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
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
}>]>>, z.ZodObject<{
    _ref: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    _ref?: string | undefined;
}, {
    _ref?: string | undefined;
}>]>;
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
declare const callRendererInputSchema: z.ZodObject<{
    value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    colDef: z.ZodObject<{
        field: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        field: string;
    }, {
        field: string;
    }>;
}, "strip", z.ZodTypeAny, {
    value: string | number;
    colDef: {
        field: string;
    };
}, {
    value: string | number;
    colDef: {
        field: string;
    };
}>;

type ColumnKey = {
    column_type: string;
    display_name: string;
    description?: string;
    example?: string;
    [p: `x-${string}`]: unknown;
};
declare const ColumnKeySchema: z.ZodObject<{
    column_type: z.ZodString;
    display_name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    column_type: string;
    display_name: string;
    description?: string | undefined;
    example?: string | undefined;
}, {
    column_type: string;
    display_name: string;
    description?: string | undefined;
    example?: string | undefined;
}>;
type AssociationKey = {
    display_name: string;
    slug: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    visible: boolean;
};
declare const AssociationKeySchema: z.ZodObject<{
    display_name: z.ZodString;
    slug: z.ZodString;
    model_name: z.ZodString;
    foreign_key: z.ZodString;
    primary_key: z.ZodString;
    visible: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    model_name: string;
    primary_key: string;
    display_name: string;
    foreign_key: string;
    slug: string;
    visible: boolean;
}, {
    model_name: string;
    primary_key: string;
    display_name: string;
    foreign_key: string;
    slug: string;
    visible: boolean;
}>;
type ReferenceKey = {
    display_name: string;
    model_name: string;
    reference_type: 'belongs_to' | 'has_one';
    foreign_key: string;
    primary_key: string;
};
declare const ReferenceKeySchema: z.ZodObject<{
    display_name: z.ZodString;
    model_name: z.ZodString;
    reference_type: z.ZodUnion<[z.ZodLiteral<"belongs_to">, z.ZodLiteral<"has_one">]>;
    foreign_key: z.ZodString;
    primary_key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    model_name: string;
    primary_key: string;
    display_name: string;
    foreign_key: string;
    reference_type: "belongs_to" | "has_one";
}, {
    model_name: string;
    primary_key: string;
    display_name: string;
    foreign_key: string;
    reference_type: "belongs_to" | "has_one";
}>;
type ResourceKey = {
    class_name: string;
    display_column?: string;
    display_name: string;
    display_primary_key: string;
    name: string;
    primary_key: string | null;
    searchable_columns?: string;
    slug: string;
    table_name: string;
    visible: boolean;
    [p: `x-${string}`]: unknown;
    properties?: Record<string, ColumnKey | AssociationKey | ReferenceKey>;
    required?: string[];
};
declare const ResourceKeySchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    table_name: z.ZodString;
    class_name: z.ZodString;
    display_name: z.ZodString;
    primary_key: z.ZodNullable<z.ZodString>;
    visible: z.ZodBoolean;
    display_primary_key: z.ZodString;
    display_column: z.ZodOptional<z.ZodString>;
    searchable_columns: z.ZodOptional<z.ZodString>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        column_type: z.ZodString;
        display_name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        column_type: string;
        display_name: string;
        description?: string | undefined;
        example?: string | undefined;
    }, {
        column_type: string;
        display_name: string;
        description?: string | undefined;
        example?: string | undefined;
    }>, z.ZodObject<{
        display_name: z.ZodString;
        slug: z.ZodString;
        model_name: z.ZodString;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
        visible: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        visible: boolean;
    }, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        visible: boolean;
    }>, z.ZodObject<{
        display_name: z.ZodString;
        model_name: z.ZodString;
        reference_type: z.ZodUnion<[z.ZodLiteral<"belongs_to">, z.ZodLiteral<"has_one">]>;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    }, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    }>]>>>;
    required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    primary_key: string | null;
    display_name: string;
    slug: string;
    display_primary_key: string;
    visible: boolean;
    class_name: string;
    table_name: string;
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
    properties?: Record<string, {
        column_type: string;
        display_name: string;
        description?: string | undefined;
        example?: string | undefined;
    } | {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        visible: boolean;
    } | {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    }> | undefined;
    required?: string[] | undefined;
}, {
    name: string;
    primary_key: string | null;
    display_name: string;
    slug: string;
    display_primary_key: string;
    visible: boolean;
    class_name: string;
    table_name: string;
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
    properties?: Record<string, {
        column_type: string;
        display_name: string;
        description?: string | undefined;
        example?: string | undefined;
    } | {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        visible: boolean;
    } | {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    }> | undefined;
    required?: string[] | undefined;
}>;

declare const ResourceUISchema: z.ZodObject<Omit<{
    name: z.ZodString;
    slug: z.ZodString;
    table_name: z.ZodString;
    class_name: z.ZodString;
    display_name: z.ZodString;
    primary_key: z.ZodNullable<z.ZodString>;
    visible: z.ZodBoolean;
    display_primary_key: z.ZodString;
    display_column: z.ZodOptional<z.ZodString>;
    searchable_columns: z.ZodOptional<z.ZodString>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        column_type: z.ZodString;
        display_name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        column_type: string;
        display_name: string;
        description?: string | undefined;
        example?: string | undefined;
    }, {
        column_type: string;
        display_name: string;
        description?: string | undefined;
        example?: string | undefined;
    }>, z.ZodObject<{
        display_name: z.ZodString;
        slug: z.ZodString;
        model_name: z.ZodString;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
        visible: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        visible: boolean;
    }, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        slug: string;
        visible: boolean;
    }>, z.ZodObject<{
        display_name: z.ZodString;
        model_name: z.ZodString;
        reference_type: z.ZodUnion<[z.ZodLiteral<"belongs_to">, z.ZodLiteral<"has_one">]>;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    }, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    }>]>>>;
    required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "required" | "properties">, "strip", z.ZodTypeAny, {
    name: string;
    primary_key: string | null;
    display_name: string;
    slug: string;
    display_primary_key: string;
    visible: boolean;
    class_name: string;
    table_name: string;
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
}, {
    name: string;
    primary_key: string | null;
    display_name: string;
    slug: string;
    display_primary_key: string;
    visible: boolean;
    class_name: string;
    table_name: string;
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
}>;
declare const ColumnUISchema: z.ZodObject<{
    column_type: z.ZodString;
    display_name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    validators: z.ZodArray<z.ZodUnknown, "many">;
    reference: z.ZodOptional<z.ZodObject<{
        display_name: z.ZodString;
        model_name: z.ZodString;
        reference_type: z.ZodUnion<[z.ZodLiteral<"belongs_to">, z.ZodLiteral<"has_one">]>;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    }, {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    column_type: string;
    display_name: string;
    validators: unknown[];
    description?: string | undefined;
    example?: string | undefined;
    reference?: {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    } | undefined;
}, {
    name: string;
    column_type: string;
    display_name: string;
    validators: unknown[];
    description?: string | undefined;
    example?: string | undefined;
    reference?: {
        model_name: string;
        primary_key: string;
        display_name: string;
        foreign_key: string;
        reference_type: "belongs_to" | "has_one";
    } | undefined;
}>;
declare const PluginKeySchema: z.ZodEffects<z.ZodType<Record<`x-${string}`, unknown>, z.ZodTypeDef, Record<`x-${string}`, unknown>>, Record<`x-${string}`, unknown>, Record<`x-${string}`, unknown>>;
type PluginKey = z.infer<typeof PluginKeySchema>;
type ColumUI = z.infer<typeof ColumnUISchema> & PluginKey;

export { type AssociationKey, AssociationKeySchema, type ColumUI, type ColumnKey, ColumnKeySchema, ColumnUISchema, GridModelSymbol, type JSONObject, type JSONValue, LoginModelSymbol, type PluginKey, PluginKeySchema, PreviewModelSymbol, type ReferenceKey, ReferenceKeySchema, type ResourceKey, ResourceKeySchema, ResourceUISchema, agFilterInner2Schema, agFilterInnerSchema, agFilterSchema, agSortSchema, callRendererInputSchema, getResourceDataInputSchema, getResourceDataOutputInnerSchema, getResourceDataOutputSchema, getResourceInputSchema, loginInputSchema, loginInputSchemaDto, loginOutputSchema, loginOutputSchemaDto, putResourceDataInputSchema, resourceAssociationSchema, resourceColumnSchema, resourceKeySchema, resourceSchema, selectOptionSchema };
