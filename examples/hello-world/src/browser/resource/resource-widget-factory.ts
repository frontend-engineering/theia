import { EditorWidgetFactory } from '@theia/editor/lib/browser/editor-widget-factory'
import { inject, injectable } from '@theia/core/shared/inversify'
import { EditorWidget } from '@theia/editor/lib/browser'
import { NavigatableWidgetOptions } from '@theia/core/lib/browser'
import { URI } from '@theia/core'
import { getUriDisplayName, GridModel, TreeGridModel } from '@flowda/design'
import { MenuWidget } from './widgets/menu-widget'
import { ResourceGridWidget } from './widgets/resource-grid-widget'

@injectable()
export class ResourceWidgetFactory extends EditorWidgetFactory {
  @inject('Factory<GridModel>') private readonly gridModelFactory: () => GridModel
  @inject('Factory<TreeGridModel>') private readonly treeGridModelFactory: () => TreeGridModel
  private resourceGridMap = new Map<string, unknown>()

  static override ID = 'resource-editor-opener'
  override readonly id = ResourceWidgetFactory.ID

  static override createID(uri: URI, counter?: number): string {
    return ResourceWidgetFactory.ID
      + `:${uri.toString()}`
      + (counter !== undefined ? `:${counter}` : '')
  }

  public getOrCreateGridModel(uri: URI): unknown {
    const key = uri.withoutQuery().toString()
    if (!this.resourceGridMap.has(key)) {
      // todo: plugin model
      switch (uri.scheme) {
        case 'grid':
          this.resourceGridMap.set(key, this.gridModelFactory())
          break
        case 'tree-grid':
          this.resourceGridMap.set(key, this.treeGridModelFactory())
          break
        default:
          throw new Error(`unknown uri, ${uri}`)
      }
    }
    return this.resourceGridMap.get(key)!
  }

  override async createWidget(options: NavigatableWidgetOptions): Promise<EditorWidget> {
    const uri = new URI(options.uri)
    // todo: plugin model
    if (uri.scheme === 'tree-grid') {
      const treeGridModel = this.getOrCreateGridModel(uri) as TreeGridModel
      treeGridModel.resetGridReadyPromise(options.uri)
      const widget = new MenuWidget({
        id: ResourceWidgetFactory.createID(uri),
        uri: options.uri,
        title: getUriDisplayName(uri),
        model: treeGridModel,
      })
      widget.id = ResourceWidgetFactory.ID + ':' + options.uri + ':' + options.counter
      return Promise.resolve(widget as unknown as EditorWidget)
    }

    if (uri.scheme === 'grid') {
      const gridModel = this.getOrCreateGridModel(uri) as GridModel
      gridModel.resetRefPromise(uri.toString())
      const widget = new ResourceGridWidget({
        id: ResourceWidgetFactory.createID(uri),
        uri: options.uri,
        title: getUriDisplayName(uri),
        model: gridModel,
      })
      widget.id = ResourceWidgetFactory.ID + ':' + options.uri + ':' + options.counter
      return Promise.resolve(widget as unknown as EditorWidget)
    }

    return super.createWidget(options)
  }
}
