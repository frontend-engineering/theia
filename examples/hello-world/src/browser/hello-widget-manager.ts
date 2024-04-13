import { WidgetConstructionOptions, WidgetManager } from '@theia/core/lib/browser'
import { inject, injectable } from '@theia/core/shared/inversify'
import { Widget } from '@phosphor/widgets'
import { ResourceWidgetFactory } from './resource/resource-widget-factory'
import { URI } from '@theia/core'
import { uriAsKey } from '@flowda/design'

@injectable()
export class HelloWidgetManager extends WidgetManager {
  @inject(ResourceWidgetFactory) protected resourceWidgetFactory: ResourceWidgetFactory

  /**
   * 在 unload 时会 save layout 调用 WidgetManager#getDescription
   * 这里重新绑定下，从 model 里拿到最新的 uri（带 filterModel)
   */
  override getDescription(widget: Widget): WidgetConstructionOptions | undefined {
    for (const [key, aWidget] of this.widgets.entries()) {
      if (aWidget === widget) {
        const ret = this.fromKey(key)
        if (ret.factoryId === ResourceWidgetFactory.ID) {
          const uri = ret.options.uri
          const model = this.resourceWidgetFactory.getOrCreateGridModel(new URI(uri))
          ret.options.uri = model.getUri()
        }
        return ret
      }
    }
    return undefined
  }

  protected override toKey(options: WidgetConstructionOptions): string {
    if (options.factoryId === ResourceWidgetFactory.ID) {
      const uriKey = uriAsKey(options.options.uri)
      return super.toKey({
        ...options,
        options: {
          ...options.options,
          uri: uriKey,
        },
      })
    } else {
      return super.toKey(options)
    }
  }
}
