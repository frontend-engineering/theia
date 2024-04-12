import { EditorManager, EditorWidget, WidgetId } from '@theia/editor/lib/browser'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ResourceWidgetFactory } from './resource-widget-factory'
import URI from '@theia/core/lib/common/uri'
import { ReactWidget, WidgetOpenerOptions } from '@theia/core/lib/browser'
import { ILogger } from '@theia/core'
import {
  convertTreeGridUriToGridUri,
  extractId,
  getUriSchemaName,
  GridModel,
  TreeGridModel,
  uriAsKey,
  uriWithoutId,
} from '@flowda/design'

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

      const uri = new URI(uriWithoutId(widget.id.replace(`${ResourceWidgetFactory.ID}:`, '')))
      this.logger.info(`[ResourceManager] onCurrentEditorChanged ${uri.toString()}`)

      if (uri.scheme === 'grid') {
        const gridModel = this.resourceWidgetFactory.getOrCreateGridModel(uri) as GridModel

        gridModel!.getCol(`${uri.authority}.${getUriSchemaName(uri)}`)
      }
      if (uri.scheme === 'tree-grid') {
        const treeGridModel = this.resourceWidgetFactory.getOrCreateGridModel(uri) as TreeGridModel
        const gridUri = new URI(convertTreeGridUriToGridUri(uri.toString()))
        const gridModel = this.resourceWidgetFactory.getOrCreateGridModel(gridUri) as GridModel

        treeGridModel.setUri(uri.toString())
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
      const uri = uriWithoutId(widget.id.replace(`${this.id}:`, ''))
      const id = Number(widget.id.slice(widget.id.lastIndexOf(':') + 1))
      return { id, uri }
    }
    throw new Error(`widget is not valid`)
  }

  protected override getCounterForUri(uri: URI): number | undefined {
    const counterOfMostRecentlyVisibleEditor = this.recentlyVisibleIds.find(id => {
      const uri1 = uriWithoutId(id.replace(`${this.id}:`, ''))
      return uriAsKey(uri1) === uriAsKey(uri)
    })
    if (counterOfMostRecentlyVisibleEditor) {
      return extractId(counterOfMostRecentlyVisibleEditor)
    } else {
      return undefined
    }
  }
}
