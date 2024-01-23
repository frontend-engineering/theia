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
    const rt = await trpcProxyClient.hello.createRoot.query()
    return rt as any
  }
}
