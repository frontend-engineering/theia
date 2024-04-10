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
  @inject('Factory<GridModel>') public readonly gridModelFactory: () => GridModel
  @inject('Factory<TreeGridModel>') public readonly treeGridModelFactory: () => TreeGridModel

  static override ID = 'resource-editor-opener'
  override readonly id = ResourceWidgetFactory.ID

  private gridModelMap = new Map<string, GridModel>()

  static override createID(uri: URI, counter?: number): string {
    return ResourceWidgetFactory.ID
      + `:${uri.toString()}`
      + (counter !== undefined ? `:${counter}` : '')
  }

  public getOrCreateGridModel(uri: string) {
    if (!this.gridModelMap.has(uri)) {
      this.gridModelMap.set(uri, this.gridModelFactory())
    }
    return this.gridModelMap.get(uri)!
  }

  override async createWidget(options: NavigatableWidgetOptions): Promise<EditorWidget> {
    const uri = new URI(options.uri)
    if (uri.scheme === 'tree-grid') {
      const treeGridModel = this.treeGridModelFactory()
      const widget = new MenuWidget({
        id: ResourceWidgetFactory.createID(uri),
        uri: options.uri,
        title: 'hello edit menu',
        model: treeGridModel,
      })
      return Promise.resolve(widget as unknown as EditorWidget)
    }

    if (uri.scheme === 'grid') {
      const gridModel = this.getOrCreateGridModel(uri.toString())
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
