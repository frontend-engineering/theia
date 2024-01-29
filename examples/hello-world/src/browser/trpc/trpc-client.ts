import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
// eslint-disable-next-line @theia/runtime-import-check
import type { AppRouter } from '@flowda-projects/flowda-services-trpc-server'
import { customLink } from './custom-link'
import { inject, injectable } from 'inversify'
import { CommandRegistry } from '@theia/core'

@injectable()
export class TrpcProxyClient {
  constructor(
    @inject(CommandRegistry) protected readonly commandRegistry: CommandRegistry,
  ) {}

  private trpcProxyClient = createTRPCProxyClient<AppRouter>({
    links: [
      loggerLink(),
      customLink({
        commandRegistry: this.commandRegistry,
      }),
      httpBatchLink({
        // url: `https://api.webinfra.cloud/flowda-api/trpc`,
        url: `http://localhost:3350/flowda-api/trpc`,
        // You can pass any HTTP headers you wish here
        async headers() {
          return {
            'x-from': 'hello-world',
            authorization: localStorage.getItem('access_token') || '',
          }
        },
      }),
    ],
  })

  public get client() {
    return this.trpcProxyClient
  }
}
