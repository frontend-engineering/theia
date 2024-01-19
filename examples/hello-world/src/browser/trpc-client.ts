import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../node/trpc-server';

export const trpcProxyClient = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
            // You can pass any HTTP headers you wish here
            async headers() {
                return {
                    // authorization: getAuthCookie(),
                };
            },
        }),
    ],
});

