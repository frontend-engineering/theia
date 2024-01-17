import { inject, injectable } from '@theia/core/shared/inversify'
import { FileNavigatorModel } from '@theia/navigator/lib/browser'
import { FileNavigatorTree } from '@theia/navigator/lib/browser/navigator-tree'
import { HelloFileNavigatorTree } from './hello-navigator-tree'

@injectable()
export class HelloFileNavigatorModel extends FileNavigatorModel {
    @inject(HelloFileNavigatorTree) protected override readonly tree: FileNavigatorTree

}
