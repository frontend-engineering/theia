import { EditorManager, EditorOpenerOptions, EditorWidget, WidgetId } from '@theia/editor/lib/browser'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ResourceWidgetFactory } from './resource-widget-factory'
import URI from '@theia/core/lib/common/uri'
import { NavigatableWidgetOptions, WidgetOpenerOptions } from '@theia/core/lib/browser'
import { ResourceGridWidget } from './widgets/resource-grid-widget'
import { ILogger } from '@theia/core'
import { handleContextMenuInputSchema } from '@flowda/types'
import { MenuWidget } from './widgets/menu-widget'
import { getUriSchemaName } from '@flowda/design'

@injectable()
export class ResourceManager extends EditorManager {
  override readonly id = ResourceWidgetFactory.ID
  override readonly label = 'Hello Editor'

  @inject(ILogger) protected logger: ILogger

  @inject(ResourceWidgetFactory) protected resourceWidgetFactory: ResourceWidgetFactory

  @postConstruct()
  protected override init(): void {
    super.init()
    this.onCurrentEditorChanged(widget => {
      if (widget == null) {
        this.logger.warn(`onCurrentEditorChanged widget is null`)
        return
      }
      if (!('uri' in widget) || typeof widget.uri !== 'string') {
        this.logger.warn(`widget no uri or not string type`)
        return
      }

      const uri = new URI(widget.uri)
      if (uri.scheme === 'grid') {
        this.logger.info(`[ResourceManager] onCurrentEditorChanged ${widget.uri}`)
        const gridModel = this.resourceWidgetFactory.getOrCreateGridModel(widget.uri)
        gridModel!.getCol(`${uri.authority}.${getUriSchemaName(uri)}`)
      }
    })
  }

  override canHandle(uri: URI, options?: WidgetOpenerOptions): number {
    return 110 // 需要 > EditorManger 100，先处理 resource manager 并 return 调过 editor manager 的基类处理逻辑
  }

  protected override extractIdFromWidget(widget: unknown): WidgetId {
    // todo: 整体判断是否有 widget.uri，则不认识为 widget.editor.uri
    if (widget instanceof MenuWidget) {
      return {
        id: 0,
        uri: '',
      }
    }
    if (widget instanceof ResourceGridWidget) {
      if (!widget.uri) throw new Error('widget.uri is null')
      const uri = widget.uri
      const id = Number(widget.id.slice(widget.id.lastIndexOf(':') + 1))
      return { id, uri }
    } else {
      return super.extractIdFromWidget(widget as EditorWidget)
    }
  }

  protected override createWidgetOptions(uri: URI, options?: EditorOpenerOptions): NavigatableWidgetOptions {
    // todo: 改成 scheme 整个这个方法就不需要 override 了
    const parseRet = handleContextMenuInputSchema.safeParse(uri)
    if (parseRet.success) {
      return {
        counter: options?.counter,
        kind: 'navigatable',
        uri: JSON.stringify(parseRet.data),
      }
    }
    const ret = super.createWidgetOptions(uri, options)
    return ret
  }

  protected override getCounterForUri(uri: URI): number | undefined {
    const idWithoutCounter = ResourceWidgetFactory.createID(uri)
    const counterOfMostRecentlyVisibleEditor = this.recentlyVisibleIds.find(id => id.startsWith(idWithoutCounter))?.slice(idWithoutCounter.length + 1)
    return counterOfMostRecentlyVisibleEditor === undefined ? undefined : parseInt(counterOfMostRecentlyVisibleEditor)
  }
}
