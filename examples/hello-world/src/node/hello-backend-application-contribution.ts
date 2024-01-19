import * as express from 'express'
import { injectable } from 'inversify'
import { BackendApplicationContribution } from '@theia/core/lib/node'
import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc-server'

@injectable()
export class HelloBackendApplicationContribution implements BackendApplicationContribution {

    configure(app: express.Application): void {
        const createContext = ({
                                   req,
                                   res,
                               }: trpcExpress.CreateExpressContextOptions) => ({}) // no context
        type Context = inferAsyncReturnType<typeof createContext>;
        const t = initTRPC.context<Context>().create()

        app.use(
            '/trpc',
            trpcExpress.createExpressMiddleware({
                router: appRouter,
                createContext,
            }),
        )

        app.get('/_hi', (_, res) => {
            res.send('hello')
        })
    }
}
