import { inject, injectable } from '@theia/core/shared/inversify'
import { FileNavigatorModel } from '@theia/navigator/lib/browser'
import { FileNavigatorTree } from '@theia/navigator/lib/browser/navigator-tree'
import { HelloFileNavigatorTree } from './hello-navigator-tree'
import { open, OpenerService, TreeNode } from '@theia/core/lib/browser'
import { TrpcProxyClient } from '../trpc/trpc-client'
import { URI } from '@theia/core'
import { ResourceWidgetFactory } from '../resource/resource-widget-factory'

@injectable()
export class HelloFileNavigatorModel extends FileNavigatorModel {
  @inject(HelloFileNavigatorTree) protected override readonly tree: FileNavigatorTree
  @inject(OpenerService) protected override readonly openerService: OpenerService
  @inject(TrpcProxyClient) protected readonly trpcProxyClient: TrpcProxyClient
  @inject(ResourceWidgetFactory) protected resourceWidgetFactory: ResourceWidgetFactory

  override async createRoot(): Promise<TreeNode | undefined> {
    const rt = await this.trpcProxyClient.client.hello.createRoot.query()
    return rt as unknown as TreeNode
  }

  override previewNode(node: TreeNode): void {
    if ('uri' in node && typeof node.uri === 'string') {
      open(this.openerService, new URI(node.uri), {
        mode: 'reveal',
        preview: true,
      })
    }
  }
}
