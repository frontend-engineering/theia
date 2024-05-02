import { EditorManager, EditorOpenerOptions, EditorWidget, WidgetId } from '@theia/editor/lib/browser'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ResourceWidgetFactory } from './resource-widget-factory'
import URI from '@theia/core/lib/common/uri'
import { NavigatableWidgetOptions, WidgetOpenerOptions } from '@theia/core/lib/browser'
import { ILogger } from '@theia/core'
import { convertTreeGridUriToGridUri, getUriSchemaName, GridModel, TreeGridModel, uriAsKey } from '@flowda/design'
import { ManageableWidget } from './widgets/manageable-widget'

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

      if (widget instanceof ManageableWidget) {
        const manageableModel = this.resourceWidgetFactory.getOrCreateGridModel(widget.uri)
        const uri_ = manageableModel.getUri()
        // const uri = new URI(widget.uri)
        const uri = new URI(uri_)
        this.logger.info(`[ResourceManager] onCurrentEditorChanged ${uri.toString(true)}`)

        if (uri.scheme === 'grid') {
          const gridModel = this.resourceWidgetFactory.getOrCreateGridModel(uri) as GridModel

          gridModel!.getCol(`${uri.authority}.${getUriSchemaName(uri)}`)
        }
        if (uri.scheme === 'tree-grid') {
          const treeGridModel = this.resourceWidgetFactory.getOrCreateGridModel(uri) as TreeGridModel
          const gridUri = new URI(convertTreeGridUriToGridUri(uri))
          const gridModel = this.resourceWidgetFactory.getOrCreateGridModel(gridUri) as GridModel

          treeGridModel.resetGridReadyPromise(uri)
          treeGridModel.loadData()
        }
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
    if (widget instanceof ManageableWidget) {
      const uri = widget.uri
      const id = Number(widget.id.slice(widget.id.lastIndexOf(':') + 1))
      return { id, uri }
    }
    throw new Error(`widget is not valid`)
  }

  protected override getCounterForUri(uri: URI): number | undefined {
    const idWithoutCounter = ResourceWidgetFactory.createID(new URI(uriAsKey(uri)))
    const counterOfMostRecentlyVisibleEditor = this.recentlyVisibleIds.find(id => {
      return id.startsWith(idWithoutCounter)
    })?.slice(idWithoutCounter.length + 1)
    return counterOfMostRecentlyVisibleEditor === undefined ? undefined : parseInt(counterOfMostRecentlyVisibleEditor)
  }

  protected override createWidgetOptions(uri: URI, options?: EditorOpenerOptions): NavigatableWidgetOptions {
    if (uri.scheme === 'grid' || uri.scheme === 'tree-grid') {
      const navigatableOptions: NavigatableWidgetOptions = {
        kind: 'navigatable',
        uri: uri.withoutFragment().toString(true),
      }
      navigatableOptions.counter = options?.counter ?? this.getOrCreateCounterForUri(uri)
      return navigatableOptions
    } else {
      return super.createWidgetOptions(uri, options)
    }
  }
}
