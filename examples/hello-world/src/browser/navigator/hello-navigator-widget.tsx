import { inject, injectable } from '@theia/core/shared/inversify'
import { CLASS, FILE_NAVIGATOR_ID, FileNavigatorWidget } from '@theia/navigator/lib/browser'
import { ContextMenuRenderer, TreeProps } from '@theia/core/lib/browser'
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
}
