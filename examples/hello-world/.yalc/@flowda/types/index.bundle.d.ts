import { z, ZodTypeDef, ZodSchema } from 'zod';
import { URI } from '@theia/core';

type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;
interface JSONObject {
    [x: string]: JSONValue;
}

declare const ServiceSymbol: unique symbol;
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
declare const agFilterSchema: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
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
}>]>>;
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
    data: z.ZodUnknown;
    valueFormatted: z.ZodNullable<z.ZodString>;
    colDef: z.ZodObject<{
        field: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        field: string;
    }, {
        field: string;
    }>;
}, "strip", z.ZodTypeAny, {
    valueFormatted: string | null;
    colDef: {
        field: string;
    };
    value?: any;
    data?: unknown;
}, {
    valueFormatted: string | null;
    colDef: {
        field: string;
    };
    value?: any;
    data?: unknown;
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
        data: z.ZodUnknown;
        valueFormatted: z.ZodNullable<z.ZodString>;
        colDef: z.ZodObject<{
            field: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            field: string;
        }, {
            field: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        valueFormatted: string | null;
        colDef: {
            field: string;
        };
        value?: any;
        data?: unknown;
    }, {
        valueFormatted: string | null;
        colDef: {
            field: string;
        };
        value?: any;
        data?: unknown;
    }>;
    column: z.ZodOptional<z.ZodObject<{
        column_type: z.ZodString;
        display_name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodString>;
        visible: z.ZodBoolean;
        access_type: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"read_only">, z.ZodLiteral<"read_write">]>>;
        name: z.ZodString;
        validators: z.ZodArray<z.ZodUnknown, "many">;
        reference: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            display_name: z.ZodString;
            model_name: z.ZodString;
            reference_type: z.ZodLiteral<"belongs_to">;
            foreign_key: z.ZodString;
            primary_key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        }, {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        }>, z.ZodObject<{
            display_name: z.ZodString;
            model_name: z.ZodString;
            reference_type: z.ZodLiteral<"has_one">;
            foreign_key: z.ZodString;
            primary_key: z.ZodString;
            visible: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        }, {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        column_type: string;
        display_name: string;
        visible: boolean;
        access_type: "read_only" | "read_write";
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        } | {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        } | undefined;
    }, {
        column_type: string;
        display_name: string;
        visible: boolean;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        access_type?: "read_only" | "read_write" | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        } | {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        } | undefined;
    }>>;
    association: z.ZodOptional<z.ZodObject<{
        display_name: z.ZodString;
        slug: z.ZodString;
        model_name: z.ZodString;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
        visible: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    }, {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    uri: string;
    cellRendererInput: {
        valueFormatted: string | null;
        colDef: {
            field: string;
        };
        value?: any;
        data?: unknown;
    };
    column?: {
        column_type: string;
        display_name: string;
        visible: boolean;
        access_type: "read_only" | "read_write";
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        } | {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        } | undefined;
    } | undefined;
    association?: {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    } | undefined;
}, {
    uri: string;
    cellRendererInput: {
        valueFormatted: string | null;
        colDef: {
            field: string;
        };
        value?: any;
        data?: unknown;
    };
    column?: {
        column_type: string;
        display_name: string;
        visible: boolean;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        access_type?: "read_only" | "read_write" | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        } | {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        } | undefined;
    } | undefined;
    association?: {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    } | undefined;
}>;
declare const treeGridUriQuerySchema: z.ZodObject<{
    schemaName: z.ZodString;
    displayName: z.ZodString;
    id: z.ZodString;
    field: z.ZodString;
}, "strip", z.ZodTypeAny, {
    field: string;
    schemaName: string;
    displayName: string;
    id: string;
}, {
    field: string;
    schemaName: string;
    displayName: string;
    id: string;
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
    filterModel: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
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
    }>]>>;
}, "strip", z.ZodTypeAny, {
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
    schemaName: string;
    current: number;
    pageSize: number;
    filterModel: Record<string, {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    } | {
        filterType: "text";
        operator: "OR" | "AND";
        conditions: {
            filterType: "number" | "text";
            filter: string | number;
            type: "contains" | "equals";
        }[];
    }>;
}, {
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
    schemaName: string;
    current: number;
    pageSize: number;
    filterModel: Record<string, {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    } | {
        filterType: "text";
        operator: "OR" | "AND";
        conditions: {
            filterType: "number" | "text";
            filter: string | number;
            type: "contains" | "equals";
        }[];
    }>;
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
    filterModel: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
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
    }>]>>;
}, "strip", z.ZodTypeAny, {
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
    schemaName: string;
    current: number;
    pageSize: number;
    filterModel: Record<string, {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    } | {
        filterType: "text";
        operator: "OR" | "AND";
        conditions: {
            filterType: "number" | "text";
            filter: string | number;
            type: "contains" | "equals";
        }[];
    }>;
}, {
    sort: {
        sort: "asc" | "desc";
        colId: string;
    }[];
    schemaName: string;
    current: number;
    pageSize: number;
    filterModel: Record<string, {
        filterType: "number" | "text";
        filter: string | number;
        type: "contains" | "equals";
    } | {
        filterType: "text";
        operator: "OR" | "AND";
        conditions: {
            filterType: "number" | "text";
            filter: string | number;
            type: "contains" | "equals";
        }[];
    }>;
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

declare const baseMenuItemSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    id: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    name: string;
    id: string;
    icon?: string | undefined;
}, {
    slug: string;
    name: string;
    id: string;
    icon?: string | undefined;
}>;
type MenuItem = z.infer<typeof baseMenuItemSchema> & {
    children?: MenuItem[];
    parent?: MenuItem;
};
declare const menuItemSchema: z.ZodType<MenuItem>;
declare const agMenuItemSchema: z.ZodObject<{
    slug: z.ZodString;
    name: z.ZodString;
    id: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    hierarchy: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    slug: string;
    name: string;
    id: string;
    hierarchy: string[];
    icon?: string | undefined;
}, {
    slug: string;
    name: string;
    id: string;
    hierarchy: string[];
    icon?: string | undefined;
}>;

type ColumnKey = {
    column_type: string;
    display_name: string;
    description?: string;
    example?: string;
    visible: boolean;
    access_type?: 'read_only' | 'read_write';
    [p: `x-${string}`]: unknown;
};
declare const ColumnKeySchema: z.ZodObject<{
    column_type: z.ZodString;
    display_name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodString>;
    visible: z.ZodBoolean;
    access_type: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"read_only">, z.ZodLiteral<"read_write">]>>;
}, "strip", z.ZodTypeAny, {
    column_type: string;
    display_name: string;
    visible: boolean;
    access_type: "read_only" | "read_write";
    description?: string | undefined;
    example?: string | undefined;
}, {
    column_type: string;
    display_name: string;
    visible: boolean;
    description?: string | undefined;
    example?: string | undefined;
    access_type?: "read_only" | "read_write" | undefined;
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
    visible: boolean;
    slug: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
}, {
    display_name: string;
    visible: boolean;
    slug: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
}>;
type ReferenceKey = {
    display_name: string;
    model_name: string;
    reference_type: 'belongs_to';
    foreign_key: string;
    primary_key: string;
} | {
    display_name: string;
    model_name: string;
    reference_type: 'has_one';
    foreign_key: string;
    primary_key: string;
    visible: boolean;
};
declare const ReferenceKeySchema: z.ZodUnion<[z.ZodObject<{
    display_name: z.ZodString;
    model_name: z.ZodString;
    reference_type: z.ZodLiteral<"belongs_to">;
    foreign_key: z.ZodString;
    primary_key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    display_name: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    reference_type: "belongs_to";
}, {
    display_name: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    reference_type: "belongs_to";
}>, z.ZodObject<{
    display_name: z.ZodString;
    model_name: z.ZodString;
    reference_type: z.ZodLiteral<"has_one">;
    foreign_key: z.ZodString;
    primary_key: z.ZodString;
    visible: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    display_name: string;
    visible: boolean;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    reference_type: "has_one";
}, {
    display_name: string;
    visible: boolean;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    reference_type: "has_one";
}>]>;
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
        visible: z.ZodBoolean;
        access_type: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"read_only">, z.ZodLiteral<"read_write">]>>;
    }, "strip", z.ZodTypeAny, {
        column_type: string;
        display_name: string;
        visible: boolean;
        access_type: "read_only" | "read_write";
        description?: string | undefined;
        example?: string | undefined;
    }, {
        column_type: string;
        display_name: string;
        visible: boolean;
        description?: string | undefined;
        example?: string | undefined;
        access_type?: "read_only" | "read_write" | undefined;
    }>, z.ZodObject<{
        display_name: z.ZodString;
        slug: z.ZodString;
        model_name: z.ZodString;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
        visible: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    }, {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    }>, z.ZodUnion<[z.ZodObject<{
        display_name: z.ZodString;
        model_name: z.ZodString;
        reference_type: z.ZodLiteral<"belongs_to">;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to";
    }, {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to";
    }>, z.ZodObject<{
        display_name: z.ZodString;
        model_name: z.ZodString;
        reference_type: z.ZodLiteral<"has_one">;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
        visible: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        display_name: string;
        visible: boolean;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "has_one";
    }, {
        display_name: string;
        visible: boolean;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "has_one";
    }>]>]>>>;
    required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    display_name: string;
    visible: boolean;
    slug: string;
    primary_key: string | null;
    class_name: string;
    display_primary_key: string;
    name: string;
    table_name: string;
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
    properties?: Record<string, {
        column_type: string;
        display_name: string;
        visible: boolean;
        access_type: "read_only" | "read_write";
        description?: string | undefined;
        example?: string | undefined;
    } | {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    } | {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to";
    } | {
        display_name: string;
        visible: boolean;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "has_one";
    }> | undefined;
    required?: string[] | undefined;
}, {
    display_name: string;
    visible: boolean;
    slug: string;
    primary_key: string | null;
    class_name: string;
    display_primary_key: string;
    name: string;
    table_name: string;
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
    properties?: Record<string, {
        column_type: string;
        display_name: string;
        visible: boolean;
        description?: string | undefined;
        example?: string | undefined;
        access_type?: "read_only" | "read_write" | undefined;
    } | {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    } | {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to";
    } | {
        display_name: string;
        visible: boolean;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "has_one";
    }> | undefined;
    required?: string[] | undefined;
}>;

declare const ColumnUISchema: z.ZodObject<{
    column_type: z.ZodString;
    display_name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodString>;
    visible: z.ZodBoolean;
    access_type: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"read_only">, z.ZodLiteral<"read_write">]>>;
    name: z.ZodString;
    validators: z.ZodArray<z.ZodUnknown, "many">;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        display_name: z.ZodString;
        model_name: z.ZodString;
        reference_type: z.ZodLiteral<"belongs_to">;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to";
    }, {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to";
    }>, z.ZodObject<{
        display_name: z.ZodString;
        model_name: z.ZodString;
        reference_type: z.ZodLiteral<"has_one">;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
        visible: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        display_name: string;
        visible: boolean;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "has_one";
    }, {
        display_name: string;
        visible: boolean;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "has_one";
    }>]>>;
}, "strip", z.ZodTypeAny, {
    column_type: string;
    display_name: string;
    visible: boolean;
    access_type: "read_only" | "read_write";
    name: string;
    validators: unknown[];
    description?: string | undefined;
    example?: string | undefined;
    reference?: {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to";
    } | {
        display_name: string;
        visible: boolean;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "has_one";
    } | undefined;
}, {
    column_type: string;
    display_name: string;
    visible: boolean;
    name: string;
    validators: unknown[];
    description?: string | undefined;
    example?: string | undefined;
    access_type?: "read_only" | "read_write" | undefined;
    reference?: {
        display_name: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "belongs_to";
    } | {
        display_name: string;
        visible: boolean;
        model_name: string;
        foreign_key: string;
        primary_key: string;
        reference_type: "has_one";
    } | undefined;
}>;
declare const ResourceUISchema: z.ZodObject<{
    display_name: z.ZodString;
    visible: z.ZodBoolean;
    slug: z.ZodString;
    primary_key: z.ZodNullable<z.ZodString>;
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
        visible: z.ZodBoolean;
        access_type: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"read_only">, z.ZodLiteral<"read_write">]>>;
        name: z.ZodString;
        validators: z.ZodArray<z.ZodUnknown, "many">;
        reference: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            display_name: z.ZodString;
            model_name: z.ZodString;
            reference_type: z.ZodLiteral<"belongs_to">;
            foreign_key: z.ZodString;
            primary_key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        }, {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        }>, z.ZodObject<{
            display_name: z.ZodString;
            model_name: z.ZodString;
            reference_type: z.ZodLiteral<"has_one">;
            foreign_key: z.ZodString;
            primary_key: z.ZodString;
            visible: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        }, {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        column_type: string;
        display_name: string;
        visible: boolean;
        access_type: "read_only" | "read_write";
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        } | {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        } | undefined;
    }, {
        column_type: string;
        display_name: string;
        visible: boolean;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        access_type?: "read_only" | "read_write" | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        } | {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        } | undefined;
    }>, "many">;
    associations: z.ZodArray<z.ZodObject<{
        display_name: z.ZodString;
        slug: z.ZodString;
        model_name: z.ZodString;
        foreign_key: z.ZodString;
        primary_key: z.ZodString;
        visible: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    }, {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    display_name: string;
    visible: boolean;
    slug: string;
    primary_key: string | null;
    class_name: string;
    display_primary_key: string;
    name: string;
    table_name: string;
    namespace: string;
    columns: {
        column_type: string;
        display_name: string;
        visible: boolean;
        access_type: "read_only" | "read_write";
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        } | {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        } | undefined;
    }[];
    associations: {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    }[];
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
}, {
    display_name: string;
    visible: boolean;
    slug: string;
    primary_key: string | null;
    class_name: string;
    display_primary_key: string;
    name: string;
    table_name: string;
    namespace: string;
    columns: {
        column_type: string;
        display_name: string;
        visible: boolean;
        name: string;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        access_type?: "read_only" | "read_write" | undefined;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        } | {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        } | undefined;
    }[];
    associations: {
        display_name: string;
        visible: boolean;
        slug: string;
        model_name: string;
        foreign_key: string;
        primary_key: string;
    }[];
    display_column?: string | undefined;
    searchable_columns?: string | undefined;
}>;
declare const PluginKeySchema: z.ZodEffects<z.ZodType<Record<`x-${string}`, unknown>, z.ZodTypeDef, Record<`x-${string}`, unknown>>, Record<`x-${string}`, unknown>, Record<`x-${string}`, unknown>>;
type PluginKey = z.infer<typeof PluginKeySchema>;
type ColumUI = z.infer<typeof ColumnUISchema> & PluginKey;

interface ManageableModel {
    getUri(): string;
    setUri(uri: string | URI): void;
    resetIsFirstGetRows(): void;
}

export { type AssociationKey, AssociationKeySchema, type ColumUI, type ColumnKey, ColumnKeySchema, ColumnUISchema, GridModelSymbol, type JSONObject, type JSONValue, LoginModelSymbol, type ManageableModel, type MenuItem, type PluginKey, PluginKeySchema, PreviewModelSymbol, type ReferenceKey, ReferenceKeySchema, type ResourceKey, ResourceKeySchema, ResourceUISchema, ServiceSymbol, ThemeModelSymbol, TreeGridModelSymbol, agFilterInner2Schema, agFilterInnerSchema, agFilterSchema, agMenuItemSchema, agSortSchema, baseMenuItemSchema, cellRendererInputSchema, findManyResourceDataInputSchema, findUniqueResourceDataInputSchema, getResourceDataInputSchema, getResourceDataOutputInnerSchema, getResourceDataOutputSchema, getResourceInputSchema, handleContextMenuInputSchema, loginInputSchema, loginInputSchemaDto, loginOutputSchema, loginOutputSchemaDto, menuItemSchema, putResourceDataInputSchema, resourceKeySchema, selectOptionSchema, treeGridUriQuerySchema };
