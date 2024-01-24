import { EditorWidgetFactory } from '@theia/editor/lib/browser/editor-widget-factory'
import { injectable } from '@theia/core/shared/inversify'
import { EditorWidget } from '@theia/editor/lib/browser'
import { ResourceWidget } from './resource-widget'
import { NavigatableWidgetOptions } from '@theia/core/lib/browser'
import { URI } from '@theia/core'

@injectable()
export class ResourceWidgetFactory extends EditorWidgetFactory {
  static override ID = 'resource-editor-opener'
  override readonly id = ResourceWidgetFactory.ID

  override async createWidget(options: NavigatableWidgetOptions): Promise<EditorWidget> {
    const uri = new URI(options.uri)
    if (uri.scheme === 'resource') {
      const widget = new ResourceWidget({
        id: ResourceWidgetFactory.createID(uri),
        title: uri.displayName,
      })
      widget.id = ResourceWidgetFactory.ID + ':' + options.uri + ':' + options.counter
      // @ts-expect-error
      widget.uri = options.uri
      return Promise.resolve(widget as any)
    }
    return super.createWidget(options)
  }
}
