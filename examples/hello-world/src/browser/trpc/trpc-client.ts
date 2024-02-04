import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@flowda-projects/flowda-services-trpc-server'
import { customLink } from './custom-link'
// eslint-disable-next-line @theia/runtime-import-check
import { inject, injectable } from 'inversify'
import { CommandRegistry } from '@theia/core'
import { environment } from '../environments/environment'

@injectable()
export class TrpcProxyClient {
  constructor(
    @inject(CommandRegistry) protected readonly commandRegistry: CommandRegistry,
  ) {}

  private trpcProxyClient = createTRPCProxyClient<AppRouter>({
    links: [
      customLink({
        commandRegistry: this.commandRegistry,
      }),
      httpBatchLink({
        url: environment.FLOWDA_URL,
        // You can pass any HTTP headers you wish here
        async headers() {
          return {
            'x-from': 'hello-world',
            authorization: 'Bearer ' + (localStorage.getItem('access_token') || ''),
          }
        },
      }),
    ],
  })

  public get client() {
    return this.trpcProxyClient
  }
}
