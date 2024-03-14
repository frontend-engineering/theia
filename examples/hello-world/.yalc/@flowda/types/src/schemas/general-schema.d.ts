import { z } from 'zod';
export declare const loginInputSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
declare const loginInputSchemaDto_base: import("../utils/zod-utils").ZodDto<{
    username: string;
    password: string;
}, z.ZodObjectDef<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    username: string;
    password: string;
}>;
export declare class loginInputSchemaDto extends loginInputSchemaDto_base {
}
export declare const loginOutputSchema: z.ZodObject<{
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
declare const loginOutputSchemaDto_base: import("../utils/zod-utils").ZodDto<{
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
export declare class loginOutputSchemaDto extends loginOutputSchemaDto_base {
}
export {};
