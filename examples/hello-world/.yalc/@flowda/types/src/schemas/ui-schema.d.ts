import { z } from 'zod';
export declare const selectOptionSchema: z.ZodObject<{
    value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    label: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string | number;
    label: string;
}, {
    value: string | number;
    label: string;
}>;
export declare const resourceColumnSchema: z.ZodObject<{
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
export declare const resourceAssociationSchema: z.ZodObject<{
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
export declare const resourceSchema: z.ZodObject<{
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
export declare const getResourceInputSchema: z.ZodObject<{
    schemaName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    schemaName: string;
}, {
    schemaName: string;
}>;
export declare const getResourceDataInputSchema: z.ZodObject<{
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
export declare const getResourceDataOutputInnerSchema: z.ZodObject<{
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
export declare const getResourceDataOutputSchema: z.ZodUnion<[z.ZodObject<{
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
export declare const putResourceDataInputSchema: z.ZodObject<{
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
