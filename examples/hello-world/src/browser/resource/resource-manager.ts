import { EditorManager, EditorOpenerOptions, EditorWidget } from '@theia/editor/lib/browser'
import { injectable } from '@theia/core/shared/inversify'
import { ResourceWidgetFactory } from './resource-widget-factory'
import URI from '@theia/core/lib/common/uri'
import { WidgetOpenerOptions } from '@theia/core/lib/browser'
import { ResourceWidget } from './resource-widget'

@injectable()
export class ResourceManager extends EditorManager {
  override readonly id = ResourceWidgetFactory.ID
  override readonly label = 'Resource Editor'

  override canHandle(uri: URI, options?: WidgetOpenerOptions): number {
    return 110 // > EditorManger 100
  }

  override open(uri: URI, options?: EditorOpenerOptions): Promise<EditorWidget> {
    return super.open(uri, options)
  }

  protected override async getOrCreateWidget(uri: any, options?: EditorOpenerOptions): Promise<EditorWidget> {
    if(uri.codeUri.scheme === 'resource') {
      const widget = new ResourceWidget({
        id: ResourceWidgetFactory.createID(uri),
        title: uri.displayName
      })
      return Promise.resolve(widget as any)
    }
    const editor = await super.getOrCreateWidget(uri, options)
    return editor
  }
}
