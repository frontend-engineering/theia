import { EditorManager, EditorWidget, WidgetId } from '@theia/editor/lib/browser'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ResourceWidgetFactory } from './resource-widget-factory'
import URI from '@theia/core/lib/common/uri'
import { ReactWidget, WidgetOpenerOptions } from '@theia/core/lib/browser'
import { ILogger } from '@theia/core'
import { convertTreeGridUriToGridUri, getUriSchemaName, GridModel, TreeGridModel } from '@flowda/design'

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
        const gridModel = this.resourceWidgetFactory.getOrCreateGridModel(widget.uri) as GridModel
        gridModel!.getCol(`${uri.authority}.${getUriSchemaName(uri)}`)
      }
      if (uri.scheme === 'tree-grid') {
        this.logger.info(`[ResourceManager] onCurrentEditorChanged ${widget.uri}`)
        const treeGridModel = this.resourceWidgetFactory.getOrCreateGridModel(widget.uri) as TreeGridModel
        treeGridModel.setUri(widget.uri)
        const gridUri = convertTreeGridUriToGridUri(widget.uri)
        const gridModel = this.resourceWidgetFactory.getOrCreateGridModel(gridUri) as GridModel
        treeGridModel.setGridModel(gridModel)
        treeGridModel.loadData()
      }
    })
  }

  override canHandle(uri: URI, options?: WidgetOpenerOptions): number {
    return 110 // 需要 > EditorManger 100，先处理 resource manager 并 return 调过 editor manager 的基类处理逻辑
  }

  protected override extractIdFromWidget(widget: unknown): WidgetId {
    if (widget instanceof EditorWidget) {
      return super.extractIdFromWidget(widget as EditorWidget)
    }
    if (widget instanceof ReactWidget) {
      if (!('uri' in widget) || typeof widget.uri !== 'string') throw new Error('widget.uri is null or not string')
      const uri = widget.uri
      const id = Number(widget.id.slice(widget.id.lastIndexOf(':') + 1))
      return { id, uri }
    }
    throw new Error(`widget is not valid`)
  }

  protected override getCounterForUri(uri: URI): number | undefined {
    const idWithoutCounter = ResourceWidgetFactory.createID(uri)
    const counterOfMostRecentlyVisibleEditor = this.recentlyVisibleIds.find(id => id.startsWith(idWithoutCounter))?.slice(idWithoutCounter.length + 1)
    return counterOfMostRecentlyVisibleEditor === undefined ? undefined : parseInt(counterOfMostRecentlyVisibleEditor)
  }
}
