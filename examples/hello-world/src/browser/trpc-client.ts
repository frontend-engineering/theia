import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// eslint-disable-next-line @theia/runtime-import-check
import type { AppRouter } from '@flowda-projects/flowda-services-trpc-server'

export const trpcProxyClient = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3350/flowda-api/trpc',
            // You can pass any HTTP headers you wish here
            async headers() {
                return {
                    'x-from': 'hello-world',
                    // authorization: getAuthCookie(),
                }
            },
        }),
    ],
})

