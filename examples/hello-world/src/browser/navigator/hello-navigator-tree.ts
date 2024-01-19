import { injectable } from '@theia/core/shared/inversify'
import { FileNavigatorTree, WorkspaceNode } from '@theia/navigator/lib/browser/navigator-tree'
import { CompositeTreeNode, TreeNode } from '@theia/core/lib/browser'

@injectable()
export class HelloFileNavigatorTree extends FileNavigatorTree {
    override async resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
        if (WorkspaceNode.is(parent)) {
            return parent.children
        }
        const children = await super.resolveChildren(parent)
        // @ts-ignore
        children[0].fileStat.resource._path.base = 'Untitled5.txt'
        return children
    }

}
