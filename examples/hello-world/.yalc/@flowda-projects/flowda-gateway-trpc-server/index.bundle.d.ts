import { ContainerModule } from 'inversify';
import * as _trpc_server from '@trpc/server';
import { LoggerService, INestApplication } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as znv_dist_util from 'znv/dist/util';

declare const flowdaGatewayTrpcServerModule: ContainerModule;

declare class TrpcService {
    private readonly logger;
    constructor(loggerFactory: (name: string) => LoggerService);
    trpc: {
        _config: _trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        procedure: _trpc_server.ProcedureBuilder<{
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: object;
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }>;
        middleware: <TNewParams extends _trpc_server.ProcedureParams<_trpc_server.AnyRootConfig, unknown, unknown, unknown, unknown, unknown, unknown>>(fn: _trpc_server.MiddlewareFunction<{
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {};
            _input_out: typeof _trpc_server.unsetMarker;
            _input_in: unknown;
            _output_in: unknown;
            _output_out: unknown;
            _meta: object;
        }, TNewParams>) => _trpc_server.MiddlewareBuilder<{
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _ctx_out: {};
            _input_out: typeof _trpc_server.unsetMarker;
            _input_in: unknown;
            _output_in: unknown;
            _output_out: unknown;
            _meta: object;
        }, TNewParams>;
        router: <TProcRouterRecord extends _trpc_server.ProcedureRouterRecord>(procedures: TProcRouterRecord) => _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>, TProcRouterRecord>;
        mergeRouters: typeof _trpc_server.mergeRouters;
    };
    procedure: _trpc_server.ProcedureBuilder<{
        _config: _trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _ctx_out: object;
        _input_in: typeof _trpc_server.unsetMarker;
        _input_out: typeof _trpc_server.unsetMarker;
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
        _meta: object;
    }>;
    protectedProcedure: _trpc_server.ProcedureBuilder<{
        _config: _trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            user: {};
        };
        _input_in: typeof _trpc_server.unsetMarker;
        _input_out: typeof _trpc_server.unsetMarker;
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
    }>;
    router: <TProcRouterRecord extends _trpc_server.ProcedureRouterRecord>(procedures: TProcRouterRecord) => _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, TProcRouterRecord>;
    mergeRouters: typeof _trpc_server.mergeRouters;
}

declare class ContextFactory {
    private readonly logger;
    constructor(loggerFactory: (name: string) => LoggerService);
    createContext: (opts: trpcExpress.CreateExpressContextOptions) => Promise<object>;
}

declare class HelloRouter {
    private trpc;
    private readonly logger;
    constructor(trpc: TrpcService, loggerFactory: (name: string) => LoggerService);
    helloRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        validate: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                username: string;
                password: string;
            };
            _input_out: {
                username: string;
                password: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            username: string;
            refresh_token: string;
            access_token: string;
        }>;
        createRoot: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: any;
            _input_out: any;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            id: string;
            name: string;
            visible: boolean;
            children: {
                id: string;
                name: string;
                selected: boolean;
                expanded: boolean;
                children: never[];
            }[];
        }>;
        resolveChildren: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                user: {};
            };
            _input_in: {
                pid: "flowda" | "cmsAdmin";
            };
            _input_out: {
                pid: "flowda" | "cmsAdmin";
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            id: string;
            name: string;
            selected: boolean;
            uri: {
                scheme: string;
                name: string;
            };
        }[]>;
        getResourceSchema: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                user: {};
            };
            _input_in: {
                schemaName: string;
            };
            _input_out: {
                schemaName: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            name: string;
            primary_key: string;
            slug: string;
            display_name: string | null;
            schema_name: string;
            display_primary_key: boolean;
            columns: {
                name: string;
                column_type: "string" | "boolean" | "datetime" | "integer" | "reference" | "tag" | "textarea";
                reference: {
                    primary_key: string;
                    display_name: string;
                    model_name: string;
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
                prisma?: boolean | undefined;
                display_name?: string | undefined;
                format?: {
                    select_options: {
                        value: string | number;
                        label: string;
                    }[];
                } | undefined;
                access_type?: "read_only" | undefined;
            }[];
            associations: {
                name: string;
                primary_key: string;
                slug: string;
                display_name: string;
                schema_name: string;
                model_name: string;
                foreign_key: string;
            }[];
            custom?: any;
            prisma?: boolean | undefined;
            display_column?: string | string[] | undefined;
            is_dynamic?: boolean | undefined;
            searchable_columns?: string[] | undefined;
            __jsonschema?: any;
        }>;
        getResourceData: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                user: {};
            };
            _input_in: {
                id?: number | undefined;
                sort: {
                    sort: "asc" | "desc";
                    colId: string;
                }[];
                schemaName: string;
                current: number;
                pageSize: number;
                filterModel: Record<string, {
                    filter: string;
                    type: "contains";
                    filterType: "text";
                } | {
                    filterType: "text";
                    operator: "OR" | "AND";
                    conditions: {
                        filter: string;
                        type: "contains";
                        filterType: "text";
                    }[];
                }>;
            };
            _input_out: {
                id?: number | undefined;
                sort: {
                    sort: "asc" | "desc";
                    colId: string;
                }[];
                schemaName: string;
                current: number;
                pageSize: number;
                filterModel: Record<string, {
                    filter: string;
                    type: "contains";
                    filterType: "text";
                } | {
                    filterType: "text";
                    operator: "OR" | "AND";
                    conditions: {
                        filter: string;
                        type: "contains";
                        filterType: "text";
                    }[];
                }>;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        putResourceData: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                user: {};
            };
            _input_in: {
                updatedValue?: any;
                schemaName: string;
                id: number;
            };
            _input_out: {
                updatedValue?: any;
                schemaName: string;
                id: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
    }>;
}

declare class TrpcRouter {
    private trpc;
    private helloRouter;
    private contextFactory;
    private readonly logger;
    constructor(trpc: TrpcService, helloRouter: HelloRouter, contextFactory: ContextFactory, loggerFactory: (name: string) => LoggerService);
    appRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        hello: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>, {
            validate: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    username: string;
                    password: string;
                };
                _input_out: {
                    username: string;
                    password: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                username: string;
                refresh_token: string;
                access_token: string;
            }>;
            createRoot: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: any;
                _input_out: any;
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                id: string;
                name: string;
                visible: boolean;
                children: {
                    id: string;
                    name: string;
                    selected: boolean;
                    expanded: boolean;
                    children: never[];
                }[];
            }>;
            resolveChildren: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: {
                    user: {};
                };
                _input_in: {
                    pid: "flowda" | "cmsAdmin";
                };
                _input_out: {
                    pid: "flowda" | "cmsAdmin";
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                id: string;
                name: string;
                selected: boolean;
                uri: {
                    scheme: string;
                    name: string;
                };
            }[]>;
            getResourceSchema: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: {
                    user: {};
                };
                _input_in: {
                    schemaName: string;
                };
                _input_out: {
                    schemaName: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                name: string;
                primary_key: string;
                slug: string;
                display_name: string | null;
                schema_name: string;
                display_primary_key: boolean;
                columns: {
                    name: string;
                    column_type: "string" | "boolean" | "datetime" | "integer" | "reference" | "tag" | "textarea";
                    reference: {
                        primary_key: string;
                        display_name: string;
                        model_name: string;
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
                    prisma?: boolean | undefined;
                    display_name?: string | undefined;
                    format?: {
                        select_options: {
                            value: string | number;
                            label: string;
                        }[];
                    } | undefined;
                    access_type?: "read_only" | undefined;
                }[];
                associations: {
                    name: string;
                    primary_key: string;
                    slug: string;
                    display_name: string;
                    schema_name: string;
                    model_name: string;
                    foreign_key: string;
                }[];
                custom?: any;
                prisma?: boolean | undefined;
                display_column?: string | string[] | undefined;
                is_dynamic?: boolean | undefined;
                searchable_columns?: string[] | undefined;
                __jsonschema?: any;
            }>;
            getResourceData: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: {
                    user: {};
                };
                _input_in: {
                    id?: number | undefined;
                    sort: {
                        sort: "asc" | "desc";
                        colId: string;
                    }[];
                    schemaName: string;
                    current: number;
                    pageSize: number;
                    filterModel: Record<string, {
                        filter: string;
                        type: "contains";
                        filterType: "text";
                    } | {
                        filterType: "text";
                        operator: "OR" | "AND";
                        conditions: {
                            filter: string;
                            type: "contains";
                            filterType: "text";
                        }[];
                    }>;
                };
                _input_out: {
                    id?: number | undefined;
                    sort: {
                        sort: "asc" | "desc";
                        colId: string;
                    }[];
                    schemaName: string;
                    current: number;
                    pageSize: number;
                    filterModel: Record<string, {
                        filter: string;
                        type: "contains";
                        filterType: "text";
                    } | {
                        filterType: "text";
                        operator: "OR" | "AND";
                        conditions: {
                            filter: string;
                            type: "contains";
                            filterType: "text";
                        }[];
                    }>;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, any>;
            putResourceData: _trpc_server.BuildProcedure<"mutation", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: {
                    user: {};
                };
                _input_in: {
                    updatedValue?: any;
                    schemaName: string;
                    id: number;
                };
                _input_out: {
                    updatedValue?: any;
                    schemaName: string;
                    id: number;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, any>;
        }>;
    }>;
    applyMiddleware(app: INestApplication, globalPrefix: string): void;
}
type AppRouter = TrpcRouter[`appRouter`];

declare const FLOWDA_GATEWAY_ENV: znv_dist_util.DeepReadonlyObject<{
    ACCESS_TOKEN_SECRET: string;
    FLOWDA_URL: string;
    CMS_ADMIN_URL: string;
}>;

export { type AppRouter, FLOWDA_GATEWAY_ENV, TrpcRouter, flowdaGatewayTrpcServerModule };
