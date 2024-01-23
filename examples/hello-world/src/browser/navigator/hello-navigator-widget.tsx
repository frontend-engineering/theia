import { inject, injectable } from '@theia/core/shared/inversify'
import { CLASS, FILE_NAVIGATOR_ID, FileNavigatorWidget } from '@theia/navigator/lib/browser'
import { codicon, ContextMenuRenderer, TreeProps } from '@theia/core/lib/browser'
import { HelloFileNavigatorModel } from './hello-navigator-model'

@injectable()
export class HelloFileNavigatorWidget extends FileNavigatorWidget {
    constructor(
        @inject(TreeProps) props: TreeProps,
        @inject(HelloFileNavigatorModel) override readonly model: HelloFileNavigatorModel,
        @inject(ContextMenuRenderer) contextMenuRenderer: ContextMenuRenderer,
    ) {
        super(props, model, contextMenuRenderer)
        this.id = FILE_NAVIGATOR_ID
        this.addClass(CLASS)
    }

    /*
    label provider 太复杂了 override 直接计算
     */
    // override toNodeName(node: any): string {
    //     return node.name
    // }
    //
    // override toNodeIcon(node: any): string {
    //     return `${codicon('folder')} default-folder-icon`;
    // }
    //
    // protected override doUpdateRows(): void {
    //     super.doUpdateRows()
    //     this.title.label = 'Explorer'
    // }
}
