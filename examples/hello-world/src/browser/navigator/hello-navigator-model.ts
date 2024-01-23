import { inject, injectable } from '@theia/core/shared/inversify'
import { FileNavigatorModel } from '@theia/navigator/lib/browser'
import { FileNavigatorTree } from '@theia/navigator/lib/browser/navigator-tree'
import { HelloFileNavigatorTree } from './hello-navigator-tree'
import { TreeNode } from '@theia/core/lib/browser'
import { trpcProxyClient } from '../trpc-client'

@injectable()
export class HelloFileNavigatorModel extends FileNavigatorModel {
    @inject(HelloFileNavigatorTree) protected override readonly tree: FileNavigatorTree

    override async createRoot(): Promise<TreeNode | undefined> {
        const rt = await trpcProxyClient.hello.getResourceRoot.query()
        console.log('trpcProxyClient.getResources', rt)
        const root = await super.createRoot()
        // @ts-ignore
        root.children[0].fileStat.resource._path.base = 'temp22'
        return root
    }
}
