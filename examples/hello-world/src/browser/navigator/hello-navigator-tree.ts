import { inject, injectable } from '@theia/core/shared/inversify'
import { FileNavigatorTree, WorkspaceNode } from '@theia/navigator/lib/browser/navigator-tree'
import { CompositeTreeNode, TreeNode } from '@theia/core/lib/browser'
import { TrpcProxyClient } from '../trpc/trpc-client'

@injectable()
export class HelloFileNavigatorTree extends FileNavigatorTree {
  @inject(TrpcProxyClient) protected readonly trpcProxyClient: TrpcProxyClient

  override async resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
    if (WorkspaceNode.is(parent)) {
      return parent.children
    }
    const rt = await this.trpcProxyClient.client.hello.resolveChildren.query({
      pid: parent.id,
    })
    return rt as unknown as TreeNode[]
  }
}
