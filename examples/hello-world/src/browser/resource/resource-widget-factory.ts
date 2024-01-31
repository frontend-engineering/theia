import { EditorWidgetFactory } from '@theia/editor/lib/browser/editor-widget-factory'
import { inject, injectable } from '@theia/core/shared/inversify'
import { EditorWidget } from '@theia/editor/lib/browser'
import { ResourceWidget } from './resource-widget'
import { NavigatableWidgetOptions } from '@theia/core/lib/browser'
import { URI } from '@theia/core'
import { ResourceModel } from './resource.model'

@injectable()
export class ResourceWidgetFactory extends EditorWidgetFactory {
  @inject(ResourceModel) protected readonly resourceModel: ResourceModel

  static override ID = 'resource-editor-opener'
  override readonly id = ResourceWidgetFactory.ID

  override async createWidget(options: NavigatableWidgetOptions): Promise<EditorWidget> {
    const uri = new URI(options.uri)
    if (uri.scheme === 'resource') {
      const widget = new ResourceWidget({
        id: ResourceWidgetFactory.createID(uri),
        title: uri.displayName,
        model: this.resourceModel,
      })
      widget.id = ResourceWidgetFactory.ID + ':' + options.uri + ':' + options.counter
      // @ts-expect-error
      widget.uri = options.uri
      return Promise.resolve(widget as any)
    }
    return super.createWidget(options)
  }
}
