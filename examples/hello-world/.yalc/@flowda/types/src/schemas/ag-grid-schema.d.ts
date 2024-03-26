import { z } from 'zod';
export declare const agFilterInnerSchema: z.ZodObject<{
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
export declare const agFilterInner2Schema: z.ZodObject<{
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
export declare const agFilterSchema: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
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
export declare const agSortSchema: z.ZodArray<z.ZodObject<{
    colId: z.ZodString;
    sort: z.ZodEnum<["asc", "desc"]>;
}, "strip", z.ZodTypeAny, {
    sort: "asc" | "desc";
    colId: string;
}, {
    sort: "asc" | "desc";
    colId: string;
}>, "many">;
export declare const callRendererInputSchema: z.ZodObject<{
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
