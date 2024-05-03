/// <reference types="@types/qs" />
/// <reference types="@flowda/types" />
import * as _trpc_client from '@trpc/client';
import * as _flowda_boot_yongcheng_trpc_server from '@flowda-boot-yongcheng/trpc-server';
import * as _trpc_server from '@trpc/server';
import * as _flowda_types from '@flowda/types';
import * as express from 'express';
import * as qs from 'qs';
import * as express_serve_static_core from 'express-serve-static-core';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            YONGCHENG_URL: string;
        }
    }
}
declare const yongchengTrpc: _trpc_client.inferRouterProxyClient<_flowda_boot_yongcheng_trpc_server.AppRouter<_trpc_server.RootConfig<{
    ctx: {
        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
        res: express.Response<any, Record<string, any>>;
        requestId: string;
        _diagnosis: any[];
        user: _flowda_types.ctxUserSchemaDto | undefined;
        tenant: _flowda_types.ctxTenantSchemaDto | undefined;
    };
    meta: object;
    errorShape: _trpc_server.DefaultErrorShape;
    transformer: {
        input: {
            serialize: (object: any) => any;
            deserialize: (object: any) => any;
        };
        output: {
            serialize: (object: any) => any;
            deserialize: (object: any) => any;
        };
    };
}>, {
    schema: _flowda_boot_yongcheng_trpc_server.AppRouter<_trpc_server.RootConfig<{
        ctx: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express.Response<any, Record<string, any>>;
            requestId: string;
            _diagnosis: any[];
            user: _flowda_types.ctxUserSchemaDto | undefined;
            tenant: _flowda_types.ctxTenantSchemaDto | undefined;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: {
            input: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
            output: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
        };
    }>, {
        getSchema: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {};
            _input_out: {};
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, Record<string, {
            display_name: string;
            visible: boolean;
            slug: string;
            primary_key: string | null;
            class_name: string;
            name: string;
            table_name: string;
            display_primary_key: string;
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
                plugins?: any;
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
            plugins?: any;
            display_column?: string | undefined;
            searchable_columns?: string | undefined;
        }>>;
        getSchemaCache: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {};
            _input_out: {};
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, Record<string, {
            display_name: string;
            visible: boolean;
            slug: string;
            primary_key: string | null;
            class_name: string;
            name: string;
            table_name: string;
            display_primary_key: string;
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
                plugins?: any;
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
            plugins?: any;
            display_column?: string | undefined;
            searchable_columns?: string | undefined;
        }>>;
    }>;
    data: _flowda_boot_yongcheng_trpc_server.AppRouter<_trpc_server.RootConfig<{
        ctx: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express.Response<any, Record<string, any>>;
            requestId: string;
            _diagnosis: any[];
            user: _flowda_types.ctxUserSchemaDto | undefined;
            tenant: _flowda_types.ctxTenantSchemaDto | undefined;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: {
            input: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
            output: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
        };
    }>, {
        get: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {
                path: string;
                user?: any;
                query?: any;
            };
            _input_out: {
                path: string;
                user?: any;
                query?: any;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        put: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {
                path: string;
                user?: any;
                values?: any;
            };
            _input_out: {
                path: string;
                user?: any;
                values?: any;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
    }>;
}>, {
    schema: _flowda_boot_yongcheng_trpc_server.AppRouter<_trpc_server.RootConfig<{
        ctx: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express.Response<any, Record<string, any>>;
            requestId: string;
            _diagnosis: any[];
            user: _flowda_types.ctxUserSchemaDto | undefined;
            tenant: _flowda_types.ctxTenantSchemaDto | undefined;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: {
            input: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
            output: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
        };
    }>, {
        getSchema: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {};
            _input_out: {};
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, Record<string, {
            display_name: string;
            visible: boolean;
            slug: string;
            primary_key: string | null;
            class_name: string;
            name: string;
            table_name: string;
            display_primary_key: string;
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
                plugins?: any;
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
            plugins?: any;
            display_column?: string | undefined;
            searchable_columns?: string | undefined;
        }>>;
        getSchemaCache: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {};
            _input_out: {};
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, Record<string, {
            display_name: string;
            visible: boolean;
            slug: string;
            primary_key: string | null;
            class_name: string;
            name: string;
            table_name: string;
            display_primary_key: string;
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
                plugins?: any;
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
            plugins?: any;
            display_column?: string | undefined;
            searchable_columns?: string | undefined;
        }>>;
    }>;
    data: _flowda_boot_yongcheng_trpc_server.AppRouter<_trpc_server.RootConfig<{
        ctx: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express.Response<any, Record<string, any>>;
            requestId: string;
            _diagnosis: any[];
            user: _flowda_types.ctxUserSchemaDto | undefined;
            tenant: _flowda_types.ctxTenantSchemaDto | undefined;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: {
            input: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
            output: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
        };
    }>, {
        get: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {
                path: string;
                user?: any;
                query?: any;
            };
            _input_out: {
                path: string;
                user?: any;
                query?: any;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        put: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {
                path: string;
                user?: any;
                values?: any;
            };
            _input_out: {
                path: string;
                user?: any;
                values?: any;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
    }>;
}>;

export { yongchengTrpc };
