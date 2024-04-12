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

  protected override addRecentlyVisible(widget: unknown): void {
    if (widget instanceof EditorWidget) {
      super.addRecentlyVisible(widget)
    } else if (widget instanceof ReactWidget) {
      this.removeRecentlyVisible(widget)
      this.recentlyVisibleIds.unshift(getKey(widget.id))
    } else {
      throw new Error(`widget is not valid`)
    }
  }

  protected override removeRecentlyVisible(widget: unknown): void {
    if (widget instanceof EditorWidget) {
      super.removeRecentlyVisible(widget)
    } else if (widget instanceof ReactWidget) {
      const key = getKey(widget.id)
      const index = this.recentlyVisibleIds.indexOf(key)
      if (index !== -1) {
        this.recentlyVisibleIds.splice(index, 1)
      }
    } else {
      throw new Error(`widget is not valid`)
    }
  }

  protected override get recentlyVisible(): EditorWidget | undefined {
    const key = this.recentlyVisibleIds[0]
    if (key) {
      const ret = this.all.find(w => getKey(w.id) === key)
      return ret
    }
    return undefined
  }

  protected override getCounterForUri(uri: URI): number | undefined {
    const counterOfMostRecentlyVisibleEditor = this.recentlyVisibleIds.find(key => {
      return key === uriAsKey(uri)
    })
    if (counterOfMostRecentlyVisibleEditor) {
      return 0
    } else {
      return undefined
    }
  }
}

function getKey(id: string) {
  const uri = uriWithoutId(id.replace(`${ResourceWidgetFactory.ID}:`, ''))
  return uriAsKey(uri)
}
