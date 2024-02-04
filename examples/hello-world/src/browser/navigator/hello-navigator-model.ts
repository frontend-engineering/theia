import { inject, injectable } from '@theia/core/shared/inversify'
import { FileNavigatorModel } from '@theia/navigator/lib/browser'
import { FileNavigatorTree } from '@theia/navigator/lib/browser/navigator-tree'
import { HelloFileNavigatorTree } from './hello-navigator-tree'
import { open, OpenerService, TreeNode } from '@theia/core/lib/browser'
import { TrpcProxyClient } from '../trpc/trpc-client'
import { URI } from '@theia/core'
import { GridModel } from '@flowda-projects/flowda-theia-design'

@injectable()
export class HelloFileNavigatorModel extends FileNavigatorModel {
  @inject(HelloFileNavigatorTree) protected override readonly tree: FileNavigatorTree
  @inject(OpenerService) protected override readonly openerService: OpenerService
  @inject(TrpcProxyClient) protected readonly trpcProxyClient: TrpcProxyClient
  @inject(GridModel) protected readonly gridModel: GridModel

  override async createRoot(): Promise<TreeNode | undefined> {
    const rt = await this.trpcProxyClient.client.hello.createRoot.query()
    return rt as any
  }

  override previewNode(node: TreeNode): void {
    if ('uri' in node) {
      this.gridModel.getCol(node.id)
      this.gridModel.getData(node.id, { current: 0, pageSize: 20, sort: [] })
      open(this.openerService, node.uri as URI, { mode: 'reveal', preview: true })
    }
  }
}
