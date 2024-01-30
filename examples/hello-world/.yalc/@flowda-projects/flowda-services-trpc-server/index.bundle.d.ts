import { ContainerModule } from 'inversify';
import * as _prisma_client_flowda_runtime from '@prisma/client-flowda/runtime';
import * as _trpc_server from '@trpc/server';
import { UserService, DynamicTableDefService } from '@flowda-projects/flowda-services';
import { LoggerService, INestApplication } from '@nestjs/common';
import { SchemaService } from '@flowda-projects/flowda-shared';
import * as db from '@prisma/client-flowda';
import * as trpcExpress from '@trpc/server/adapters/express';

declare const flowdaServiceTrpcServerModule: ContainerModule;

declare class TrpcService {
    private userService;
    private readonly logger;
    constructor(userService: UserService, loggerFactory: (name: string) => LoggerService);
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

declare class SchemaRouter {
    private trpc;
    private schemaService;
    private dynamicTableDef;
    private readonly logger;
    constructor(trpc: TrpcService, schemaService: SchemaService, dynamicTableDef: DynamicTableDefService, loggerFactory: (name: string) => LoggerService);
    schemaRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        getSchema: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: undefined;
            _input_out: undefined;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
    }>;
}

declare class UserRouter {
    private trpc;
    private userService;
    private prisma;
    private readonly logger;
    constructor(trpc: TrpcService, userService: UserService, prisma: db.PrismaClient, loggerFactory: (name: string) => LoggerService);
    userRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        getTenant: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                tid: number;
            };
            _input_out: {
                tid: number;
            };
            _output_in: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                name: string;
            };
            _output_out: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                name: string;
            };
        }, unknown>;
        sendSmsVerifyCode: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                mobile: string;
            };
            _input_out: {
                mobile: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, _prisma_client_flowda_runtime.GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            mobile: string;
            code: string;
        }, unknown, never>>;
        verifyMobile: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                mobile: string;
                code: string;
                uid: number;
                tid: number;
                slug: string;
            };
            _input_out: {
                mobile: string;
                code: string;
                uid: number;
                tid: number;
                slug: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            id: number;
            tenantId: number;
        }>;
        accountExists: _trpc_server.BuildProcedure<"query", {
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
                tenantName: string;
            };
            _input_out: {
                username: string;
                tenantName: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, _prisma_client_flowda_runtime.GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            username: string;
            hashedPassword: string | null;
            hashedRefreshToken: string | null;
            unionid: string | null;
            email: string | null;
            mobile: string | null;
            image: string | null;
            tenantId: number;
        }, unknown, never>>;
        findByUnionIdAndTenantId: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                unionid: string;
                tenantId: number;
            };
            _input_out: {
                unionid: string;
                tenantId: number;
            };
            _output_in: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                username: string;
                hashedPassword: string | null;
                hashedRefreshToken: string | null;
                unionid: string | null;
                email: string | null;
                mobile: string | null;
                image: string | null;
                tenantId: number;
            } | null;
            _output_out: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                username: string;
                hashedPassword: string | null;
                hashedRefreshToken: string | null;
                unionid: string | null;
                email: string | null;
                mobile: string | null;
                image: string | null;
                tenantId: number;
            } | null;
        }, unknown>;
        registerByUnionId: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                unionid: string;
                tenantId: number;
            };
            _input_out: {
                unionid: string;
                tenantId: number;
            };
            _output_in: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                username: string;
                hashedPassword: string | null;
                hashedRefreshToken: string | null;
                unionid: string | null;
                email: string | null;
                mobile: string | null;
                image: string | null;
                tenantId: number;
            };
            _output_out: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                username: string;
                hashedPassword: string | null;
                hashedRefreshToken: string | null;
                unionid: string | null;
                email: string | null;
                mobile: string | null;
                image: string | null;
                tenantId: number;
            };
        }, unknown>;
        getTenantByName: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                tenantName: string;
            };
            _input_out: {
                tenantName: string;
            };
            _output_in: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                name: string;
            };
            _output_out: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                name: string;
            };
        }, unknown>;
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
        validateByEmail: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                password: string;
                email: string;
                tenantId: number;
            };
            _input_out: {
                password: string;
                email: string;
                tenantId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            username: string;
            refresh_token: string;
            access_token: string;
        }>;
        findMany: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                userIds: number[];
            };
            _input_out: {
                userIds: number[];
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, (_prisma_client_flowda_runtime.GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            username: string;
            hashedPassword: string | null;
            hashedRefreshToken: string | null;
            unionid: string | null;
            email: string | null;
            mobile: string | null;
            image: string | null;
            tenantId: number;
        }, unknown> & {})[]>;
        updateUserInfo: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                username?: string | undefined;
                email?: string | undefined;
                image?: string | undefined;
                userId: number;
            };
            _input_out: {
                username?: string | undefined;
                email?: string | undefined;
                image?: string | undefined;
                userId: number;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, _prisma_client_flowda_runtime.GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            username: string;
            hashedPassword: string | null;
            hashedRefreshToken: string | null;
            unionid: string | null;
            email: string | null;
            mobile: string | null;
            image: string | null;
            tenantId: number;
        }, unknown> & {}>;
        findUnique: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: object;
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: _trpc_server.DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                email?: string | undefined;
                id?: number | undefined;
            };
            _input_out: {
                email?: string | undefined;
                id?: number | undefined;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, (_prisma_client_flowda_runtime.GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            username: string;
            hashedPassword: string | null;
            hashedRefreshToken: string | null;
            unionid: string | null;
            email: string | null;
            mobile: string | null;
            image: string | null;
            tenantId: number;
        }, unknown> & {}) | null>;
    }>;
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
                pid: string;
            };
            _input_out: {
                pid: string;
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
    }>;
}

declare class ContextFactory {
    private userService;
    private readonly logger;
    constructor(userService: UserService, loggerFactory: (name: string) => LoggerService);
    createContext: (opts: trpcExpress.CreateExpressContextOptions) => Promise<object>;
}

declare class TrpcRouter {
    private trpc;
    private schemaRouter;
    private userRouter;
    private helloRouter;
    private contextFactory;
    private readonly logger;
    constructor(trpc: TrpcService, schemaRouter: SchemaRouter, userRouter: UserRouter, helloRouter: HelloRouter, contextFactory: ContextFactory, loggerFactory: (name: string) => LoggerService);
    appRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: object;
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: _trpc_server.DefaultDataTransformer;
    }>, {
        schema: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>, {
            getSchema: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: undefined;
                _input_out: undefined;
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, any>;
        }>;
        user: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>, {
            getTenant: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    tid: number;
                };
                _input_out: {
                    tid: number;
                };
                _output_in: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isDeleted: boolean;
                    name: string;
                };
                _output_out: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isDeleted: boolean;
                    name: string;
                };
            }, unknown>;
            sendSmsVerifyCode: _trpc_server.BuildProcedure<"mutation", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    mobile: string;
                };
                _input_out: {
                    mobile: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, _prisma_client_flowda_runtime.GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                mobile: string;
                code: string;
            }, unknown, never>>;
            verifyMobile: _trpc_server.BuildProcedure<"mutation", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    mobile: string;
                    code: string;
                    uid: number;
                    tid: number;
                    slug: string;
                };
                _input_out: {
                    mobile: string;
                    code: string;
                    uid: number;
                    tid: number;
                    slug: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                id: number;
                tenantId: number;
            }>;
            accountExists: _trpc_server.BuildProcedure<"query", {
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
                    tenantName: string;
                };
                _input_out: {
                    username: string;
                    tenantName: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, _prisma_client_flowda_runtime.GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                username: string;
                hashedPassword: string | null;
                hashedRefreshToken: string | null;
                unionid: string | null;
                email: string | null;
                mobile: string | null;
                image: string | null;
                tenantId: number;
            }, unknown, never>>;
            findByUnionIdAndTenantId: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    unionid: string;
                    tenantId: number;
                };
                _input_out: {
                    unionid: string;
                    tenantId: number;
                };
                _output_in: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isDeleted: boolean;
                    username: string;
                    hashedPassword: string | null;
                    hashedRefreshToken: string | null;
                    unionid: string | null;
                    email: string | null;
                    mobile: string | null;
                    image: string | null;
                    tenantId: number;
                } | null;
                _output_out: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isDeleted: boolean;
                    username: string;
                    hashedPassword: string | null;
                    hashedRefreshToken: string | null;
                    unionid: string | null;
                    email: string | null;
                    mobile: string | null;
                    image: string | null;
                    tenantId: number;
                } | null;
            }, unknown>;
            registerByUnionId: _trpc_server.BuildProcedure<"mutation", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    unionid: string;
                    tenantId: number;
                };
                _input_out: {
                    unionid: string;
                    tenantId: number;
                };
                _output_in: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isDeleted: boolean;
                    username: string;
                    hashedPassword: string | null;
                    hashedRefreshToken: string | null;
                    unionid: string | null;
                    email: string | null;
                    mobile: string | null;
                    image: string | null;
                    tenantId: number;
                };
                _output_out: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isDeleted: boolean;
                    username: string;
                    hashedPassword: string | null;
                    hashedRefreshToken: string | null;
                    unionid: string | null;
                    email: string | null;
                    mobile: string | null;
                    image: string | null;
                    tenantId: number;
                };
            }, unknown>;
            getTenantByName: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    tenantName: string;
                };
                _input_out: {
                    tenantName: string;
                };
                _output_in: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isDeleted: boolean;
                    name: string;
                };
                _output_out: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    isDeleted: boolean;
                    name: string;
                };
            }, unknown>;
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
            validateByEmail: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    password: string;
                    email: string;
                    tenantId: number;
                };
                _input_out: {
                    password: string;
                    email: string;
                    tenantId: number;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                username: string;
                refresh_token: string;
                access_token: string;
            }>;
            findMany: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    userIds: number[];
                };
                _input_out: {
                    userIds: number[];
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, (_prisma_client_flowda_runtime.GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                username: string;
                hashedPassword: string | null;
                hashedRefreshToken: string | null;
                unionid: string | null;
                email: string | null;
                mobile: string | null;
                image: string | null;
                tenantId: number;
            }, unknown> & {})[]>;
            updateUserInfo: _trpc_server.BuildProcedure<"mutation", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    username?: string | undefined;
                    email?: string | undefined;
                    image?: string | undefined;
                    userId: number;
                };
                _input_out: {
                    username?: string | undefined;
                    email?: string | undefined;
                    image?: string | undefined;
                    userId: number;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, _prisma_client_flowda_runtime.GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                username: string;
                hashedPassword: string | null;
                hashedRefreshToken: string | null;
                unionid: string | null;
                email: string | null;
                mobile: string | null;
                image: string | null;
                tenantId: number;
            }, unknown> & {}>;
            findUnique: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: object;
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: _trpc_server.DefaultDataTransformer;
                }>;
                _meta: object;
                _ctx_out: object;
                _input_in: {
                    email?: string | undefined;
                    id?: number | undefined;
                };
                _input_out: {
                    email?: string | undefined;
                    id?: number | undefined;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, (_prisma_client_flowda_runtime.GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                username: string;
                hashedPassword: string | null;
                hashedRefreshToken: string | null;
                unionid: string | null;
                email: string | null;
                mobile: string | null;
                image: string | null;
                tenantId: number;
            }, unknown> & {}) | null>;
        }>;
        hello: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
            ctx: object;
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: _trpc_server.DefaultDataTransformer;
        }>, {
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
                    pid: string;
                };
                _input_out: {
                    pid: string;
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
        }>;
    }>;
    applyMiddleware(app: INestApplication, globalPrefix: string): void;
}
type AppRouter = TrpcRouter[`appRouter`];

export { type AppRouter, TrpcRouter, flowdaServiceTrpcServerModule };
