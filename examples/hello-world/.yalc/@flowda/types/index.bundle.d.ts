import { z, ZodTypeDef, ZodSchema } from 'zod';

type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;
interface JSONObject {
    [x: string]: JSONValue;
}

declare const TreeGridModelSymbol: unique symbol;
declare const GridModelSymbol: unique symbol;
declare const PreviewModelSymbol: unique symbol;
declare const LoginModelSymbol: unique symbol;
declare const ThemeModelSymbol: unique symbol;

declare const agFilterInnerSchema: z.ZodObject<{
    filterType: z.ZodEnum<["text", "number"]>;
    type: z.ZodEnum<["contains", "equals"]>;
    filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    filterType: "number" | "text";
    filter: string | number;
    type: "contains" | "equals";
}, {
    filterType: "number" | "text";
    filter: string | number;
    type: "contains" | "equals";
}>;
declare const agFilterInner2Schema: z.ZodObject<{
    filterType: z.ZodEnum<["text"]>;
    operator: z.ZodEnum<["OR", "AND"]>;
    conditions: z.ZodArray<z.ZodObject<{
        filterType: z.ZodEnum<["text", "number"]>;
        type: z.ZodEnum<["contains", "equals"]>;
        filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    }, {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    }[];
}, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    }[];
}>;
declare const agFilterSchema: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
    filterType: z.ZodEnum<["text", "number"]>;
    type: z.ZodEnum<["contains", "equals"]>;
    filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    filterType: "number" | "text";
    filter: string | number;
    type: "contains" | "equals";
}, {
    filterType: "number" | "text";
    filter: string | number;
    type: "contains" | "equals";
}>, z.ZodObject<{
    filterType: z.ZodEnum<["text"]>;
    operator: z.ZodEnum<["OR", "AND"]>;
    conditions: z.ZodArray<z.ZodObject<{
        filterType: z.ZodEnum<["text", "number"]>;
        type: z.ZodEnum<["contains", "equals"]>;
        filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    }, {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    }[];
}, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
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
declare const cellRendererInputSchema: z.ZodObject<{
    value: z.ZodAny;
    data: z.ZodObject<{
        id: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, string, string | number>;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string | number;
    }>;
    valueFormatted: z.ZodString;
    colDef: z.ZodObject<{
        field: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        field: string;
    }, {
        field: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
    };
    valueFormatted: string;
    colDef: {
        field: string;
    };
    value?: any;
}, {
    data: {
        id: string | number;
    };
    valueFormatted: string;
    colDef: {
        field: string;
    };
    value?: any;
}>;

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

declare const handleContextMenuInputSchema: z.ZodObject<{
    uri: z.ZodString;
    cellRendererInput: z.ZodObject<{
        value: z.ZodAny;
        data: z.ZodObject<{
            id: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, string, string | number>;
        }, "strip", z.ZodTypeAny, {
            id: string;
        }, {
            id: string | number;
        }>;
        valueFormatted: z.ZodString;
        colDef: z.ZodObject<{
            field: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            field: string;
        }, {
            field: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: {
            id: string;
        };
        valueFormatted: string;
        colDef: {
            field: string;
        };
        value?: any;
    }, {
        data: {
            id: string | number;
        };
        valueFormatted: string;
        colDef: {
            field: string;
        };
        value?: any;
    }>;
    column: z.ZodObject<{
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
            display_name: string;
            model_name: string;
            reference_type: "belongs_to" | "has_one";
            foreign_key: string;
            primary_key: string;
        }, {
            display_name: string;
            model_name: string;
            reference_type: "belongs_to" | "has_one";
            foreign_key: string;
            primary_key: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        column_type: string;
        display_name: string;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            reference_type: "belongs_to" | "has_one";
            foreign_key: string;
            primary_key: string;
        } | undefined;
    }, {
        column_type: string;
        display_name: string;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            reference_type: "belongs_to" | "has_one";
            foreign_key: string;
            primary_key: string;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    uri: string;
    cellRendererInput: {
        data: {
            id: string;
        };
        valueFormatted: string;
        colDef: {
            field: string;
        };
        value?: any;
    };
    column: {
        column_type: string;
        display_name: string;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            reference_type: "belongs_to" | "has_one";
            foreign_key: string;
            primary_key: string;
        } | undefined;
    };
}, {
    uri: string;
    cellRendererInput: {
        data: {
            id: string | number;
        };
        valueFormatted: string;
        colDef: {
            field: string;
        };
        value?: any;
    };
    column: {
        column_type: string;
        display_name: string;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            reference_type: "belongs_to" | "has_one";
            foreign_key: string;
            primary_key: string;
        } | undefined;
    };
}>;
declare const treeGridUriQuerySchema: z.ZodObject<{
    schemaName: z.ZodString;
    displayName: z.ZodString;
    id: z.ZodString;
    field: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    field: string;
    schemaName: string;
    displayName: string;
}, {
    id: string;
    field: string;
    schemaName: string;
    displayName: string;
}>;

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

declare const getResourceInputSchema: z.ZodObject<{
    schemaName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schemaName: string;
}, {
    schemaName: string;
}>;
declare const findManyResourceDataInputSchema: z.ZodObject<{
    schemaName: z.ZodString;
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
    schemaName: string;
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
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
}, {
    schemaName: string;
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
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
}>;
declare const findUniqueResourceDataInputSchema: z.ZodObject<{
    schemaName: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    schemaName: string;
    id: number;
}, {
    schemaName: string;
    id: number;
}>;
declare const getResourceDataInputSchema: z.ZodUnion<[z.ZodObject<{
    schemaName: z.ZodString;
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
    schemaName: string;
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
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
}, {
    schemaName: string;
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
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
}>, z.ZodObject<{
    schemaName: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    schemaName: string;
    id: number;
}, {
    schemaName: string;
    id: number;
}>]>;
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
    display_name: string;
    slug: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    visible: boolean;
}, {
    display_name: string;
    slug: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
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
    display_name: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    reference_type: "belongs_to" | "has_one";
}, {
    display_name: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
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
        display_name: string;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        visible: boolean;
    }, {
        display_name: string;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        visible: boolean;
    }>, z.ZodObject<{
        display_name: z.ZodString;
        model_name: z.ZodString;
        reference_type: z.ZodUnion<[z.ZodLiteral<"belongs_to">, z.ZodLiteral<"has_one">]>;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to" | "has_one";
    }, {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to" | "has_one";
    }>]>>>;
    required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    display_name: string;
    slug: string;
    primary_key: string | null;
    visible: boolean;
    class_name: string;
    display_primary_key: string;
    name: string;
    table_name: string;
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
    properties?: Record<string, {
        column_type: string;
        display_name: string;
        description?: string | undefined;
        example?: string | undefined;
    } | {
        display_name: string;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        visible: boolean;
    } | {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to" | "has_one";
    }> | undefined;
    required?: string[] | undefined;
}, {
    display_name: string;
    slug: string;
    primary_key: string | null;
    visible: boolean;
    class_name: string;
    display_primary_key: string;
    name: string;
    table_name: string;
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
    properties?: Record<string, {
        column_type: string;
        display_name: string;
        description?: string | undefined;
        example?: string | undefined;
    } | {
        display_name: string;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        visible: boolean;
    } | {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to" | "has_one";
    }> | undefined;
    required?: string[] | undefined;
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
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to" | "has_one";
    }, {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to" | "has_one";
    }>>;
}, "strip", z.ZodTypeAny, {
    column_type: string;
    display_name: string;
    name: string;
    validators: unknown[];
    description?: string | undefined;
    example?: string | undefined;
    reference?: {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to" | "has_one";
    } | undefined;
}, {
    column_type: string;
    display_name: string;
    name: string;
    validators: unknown[];
    description?: string | undefined;
    example?: string | undefined;
    reference?: {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to" | "has_one";
    } | undefined;
}>;
declare const ResourceUISchema: z.ZodObject<{
    display_name: z.ZodString;
    slug: z.ZodString;
    primary_key: z.ZodNullable<z.ZodString>;
    visible: z.ZodBoolean;
    class_name: z.ZodString;
    display_column: z.ZodOptional<z.ZodString>;
    display_primary_key: z.ZodString;
    name: z.ZodString;
    searchable_columns: z.ZodOptional<z.ZodString>;
    table_name: z.ZodString;
    namespace: z.ZodString;
    columns: z.ZodArray<z.ZodObject<{
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
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to" | "has_one";
        }, {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to" | "has_one";
        }>>;
    }, "strip", z.ZodTypeAny, {
        column_type: string;
        display_name: string;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to" | "has_one";
        } | undefined;
    }, {
        column_type: string;
        display_name: string;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to" | "has_one";
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    display_name: string;
    slug: string;
    primary_key: string | null;
    visible: boolean;
    class_name: string;
    display_primary_key: string;
    name: string;
    table_name: string;
    namespace: string;
    columns: {
        column_type: string;
        display_name: string;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to" | "has_one";
        } | undefined;
    }[];
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
}, {
    display_name: string;
    slug: string;
    primary_key: string | null;
    visible: boolean;
    class_name: string;
    display_primary_key: string;
    name: string;
    table_name: string;
    namespace: string;
    columns: {
        column_type: string;
        display_name: string;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to" | "has_one";
        } | undefined;
    }[];
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
}>;
declare const PluginKeySchema: z.ZodEffects<z.ZodType<Record<`x-${string}`, unknown>, z.ZodTypeDef, Record<`x-${string}`, unknown>>, Record<`x-${string}`, unknown>, Record<`x-${string}`, unknown>>;
type PluginKey = z.infer<typeof PluginKeySchema>;
type ColumUI = z.infer<typeof ColumnUISchema> & PluginKey;

export { type AssociationKey, AssociationKeySchema, type ColumUI, type ColumnKey, ColumnKeySchema, ColumnUISchema, GridModelSymbol, type JSONObject, type JSONValue, LoginModelSymbol, type PluginKey, PluginKeySchema, PreviewModelSymbol, type ReferenceKey, ReferenceKeySchema, type ResourceKey, ResourceKeySchema, ResourceUISchema, ThemeModelSymbol, TreeGridModelSymbol, agFilterInner2Schema, agFilterInnerSchema, agFilterSchema, agSortSchema, cellRendererInputSchema, findManyResourceDataInputSchema, findUniqueResourceDataInputSchema, getResourceDataInputSchema, getResourceDataOutputInnerSchema, getResourceDataOutputSchema, getResourceInputSchema, handleContextMenuInputSchema, loginInputSchema, loginInputSchemaDto, loginOutputSchema, loginOutputSchemaDto, putResourceDataInputSchema, resourceKeySchema, selectOptionSchema, treeGridUriQuerySchema };
