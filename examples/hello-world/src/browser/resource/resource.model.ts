import { injectable } from '@theia/core/shared/inversify'
import { makeObservable, observable } from 'mobx'
import { TrpcProxyClient } from '../trpc/trpc-client'
import { inject } from 'inversify'
import { ColDef } from 'ag-grid-community'

@injectable()
export class ResourceModel {
  @observable data: any[] = []
  @observable columnDefs: ColDef[] = []

  constructor(
    @inject(TrpcProxyClient) protected readonly trpcProxyClient: TrpcProxyClient,
  ) {
    makeObservable(this)
  }

  async getResource(schemaName: string) {
    const { schema, data } = await this.trpcProxyClient.client.hello.getResource.query({
      schemaName,
    })
    if (schema.columns) {
      this.columnDefs = schema.columns.map(it => ({
        field: it.name,
        headerName: it.display_name,
      }))
    }
    this.data = data.data
  }

  async getResourceByDisplayName(name: string) {
    const schemaRet = await this.trpcProxyClient.client.hello.resolveChildren.query({
      pid: '0',
    })
    const ret = schemaRet.find(item => item.name === name)
    if (ret) {
      return this.getResource(ret.id)
    }
    return []
  }
}
