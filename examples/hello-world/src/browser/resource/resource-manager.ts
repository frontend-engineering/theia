import { EditorManager, EditorOpenerOptions, EditorWidget, WidgetId } from '@theia/editor/lib/browser'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ResourceWidgetFactory } from './resource-widget-factory'
import URI from '@theia/core/lib/common/uri'
import { NavigatableWidgetOptions, WidgetOpenerOptions } from '@theia/core/lib/browser'
import { ILogger } from '@theia/core'
import { uriAsKey } from '@flowda/design'
import { ManageableServiceSymbol } from '@flowda/types'
import { ManageableService, ManageableWidget } from '@flowda/theia'

@injectable()
export class ResourceManager extends EditorManager {
  override readonly id = ResourceWidgetFactory.ID
  override readonly label = 'Hello Editor'

  @inject(ILogger) protected logger: ILogger
  @inject(ResourceWidgetFactory) protected resourceWidgetFactory: ResourceWidgetFactory
  @inject(ManageableServiceSymbol) private readonly manageableService: ManageableService

  @postConstruct()
  protected override init(): void {
    super.init()
    this.onCreated(widget => {
      if (widget instanceof ManageableWidget) {
        widget.disposed.connect(() => {
          if (widget.uri == null) throw new Error('widget uri is null')
          this.manageableService.removeModel(widget.uri)
        })
      }
    })
    this.onCurrentEditorChanged(widget => {
      if (widget == null) {
        this.logger.warn(`onCurrentEditorChanged widget is null`)
        return
      }

      if (widget instanceof ManageableWidget) {
        if (widget.uri == null) throw new Error('widget uri is null')
        const manageableModel = this.resourceWidgetFactory.getOrCreateGridModel(widget.uri)
        this.logger.info(`[ResourceManager] onCurrentEditorChanged ${widget.uri}`)
        manageableModel.onCurrentEditorChanged()
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
      if (widget.uri == null) throw new Error('widget uri is null')
      const id = Number(widget.id.slice(widget.id.lastIndexOf(':') + 1))
      return { id, uri: widget.uri }
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
    if (this.manageableService.isManageable(uri.scheme)) {
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
