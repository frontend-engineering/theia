import { initTRPC } from '@trpc/server'

export const t = initTRPC.create()
export const appRouter = t.router({
    // getResources: t.procedure.input(z.string()).query(opts => {
    //     return [
    //         {
    //             id: 'foo-1',
    //             name: 'Foo resource 1',
    //             icon: 'npm-icon medium-red',
    //             parent: undefined,
    //             selected: false,
    //             expanded: true,
    //             children: [],
    //         },
    //         {
    //             id: 'foo-2',
    //             name: 'Foo resource 2',
    //             icon: 'npm-icon medium-red',
    //             parent: undefined,
    //             selected: false,
    //         },
    //     ]
    // }),
})
// export type definition of API
export type AppRouter = typeof appRouter;
