import {
    getResourceInputSchema,
    ResourceUISchema,
    getResourceDataInputSchema,
    getResourceDataOutputSchema,
    putResourceDataInputSchema,
    type ApiService,
    postResourceDataInputSchema, removeResourceDataInputSchema,
} from '@flowda/types'
import { z } from 'zod'
import { injectable, inject } from '@theia/core/shared/inversify'
import { type CreateTRPCProxyClient } from '@trpc/client'
import { type AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'

@injectable()
export class HelloApiService implements ApiService {
    constructor(
        @inject('trpcFactory') protected trpcFactory: () => CreateTRPCProxyClient<AppRouter>
    ) { }
    getResourceSchema(input: z.infer<typeof getResourceInputSchema>): Promise<z.infer<typeof ResourceUISchema>> {
        return this.trpcFactory().hello.getResourceSchema.query(input)
    }
    getResourceData(
        input: z.infer<typeof getResourceDataInputSchema>,
    ): Promise<z.infer<typeof getResourceDataOutputSchema>> {
        return this.trpcFactory().hello.getResourceData.query(input)
    }
    putResourceData(input: z.infer<typeof putResourceDataInputSchema>): Promise<unknown> {
        return this.trpcFactory().hello.putResourceData.mutate(input)
    }
    postResourceData(input: z.infer<typeof postResourceDataInputSchema>): Promise<unknown> {
        return this.trpcFactory().hello.postResourceData.mutate(input)
    }
    removeResourceData(input: z.infer<typeof removeResourceDataInputSchema>): Promise<unknown> {
        return this.trpcFactory().hello.removeResourceData.mutate(input)
    }
}
