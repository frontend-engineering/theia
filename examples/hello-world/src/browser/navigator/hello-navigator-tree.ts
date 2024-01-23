import { injectable } from '@theia/core/shared/inversify'
import { FileNavigatorTree, WorkspaceNode } from '@theia/navigator/lib/browser/navigator-tree'
import { CompositeTreeNode, TreeNode } from '@theia/core/lib/browser'
import { trpcProxyClient } from '../trpc-client'

@injectable()
export class HelloFileNavigatorTree extends FileNavigatorTree {
    override async resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
        if (WorkspaceNode.is(parent)) {
            return parent.children
        }
        const children = await super.resolveChildren(parent)
        return children
    }

}
