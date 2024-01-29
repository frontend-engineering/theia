import { inject, injectable } from '@theia/core/shared/inversify'
import { FileNavigatorModel } from '@theia/navigator/lib/browser'
import { FileNavigatorTree } from '@theia/navigator/lib/browser/navigator-tree'
import { HelloFileNavigatorTree } from './hello-navigator-tree'
import { open, OpenerService, TreeNode } from '@theia/core/lib/browser'
import { TrpcProxyClient } from '../trpc/trpc-client'
import { URI } from '@theia/core'

@injectable()
export class HelloFileNavigatorModel extends FileNavigatorModel {
  @inject(HelloFileNavigatorTree) protected override readonly tree: FileNavigatorTree
  @inject(OpenerService) protected override readonly openerService: OpenerService
  @inject(TrpcProxyClient) protected readonly trpcProxyClient: TrpcProxyClient

  override async createRoot(): Promise<TreeNode | undefined> {
    const rt = await this.trpcProxyClient.client.hello.createRoot.query()
    return rt as any
  }

  override previewNode(node: TreeNode): void {
    if ('uri' in node) {
      open(this.openerService, node.uri as URI, { mode: 'reveal', preview: true })
    }
  }
}
