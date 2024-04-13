import { EditorWidgetFactory } from '@theia/editor/lib/browser/editor-widget-factory'
import { inject, injectable } from '@theia/core/shared/inversify'
import { EditorWidget } from '@theia/editor/lib/browser'
import { NavigatableWidgetOptions } from '@theia/core/lib/browser'
import { URI } from '@theia/core'
import { getUriDisplayName, GridModel, TreeGridModel, uriAsKey } from '@flowda/design'
import { MenuWidget } from './widgets/menu-widget'
import { ResourceGridWidget } from './widgets/resource-grid-widget'
import type { ManageableModel } from '@flowda/types'

@injectable()
export class ResourceWidgetFactory extends EditorWidgetFactory {
  @inject('Factory<GridModel>') private readonly gridModelFactory: () => GridModel
  @inject('Factory<TreeGridModel>') private readonly treeGridModelFactory: () => TreeGridModel
  private resourceGridMap = new Map<string, ManageableModel>()

  static override ID = 'resource-editor-opener'
  override readonly id = ResourceWidgetFactory.ID

  static override createID(uri: URI, counter?: number): string {
    return ResourceWidgetFactory.ID
      + `:${uri.toString(true)}`
      + (counter !== undefined ? `:${counter}` : '')
  }

  public getOrCreateGridModel(uri: URI): ManageableModel {
    const key = uriAsKey(uri)
    let factory: () => ManageableModel

    if (uri.scheme === 'grid') {
      factory = this.gridModelFactory
    } else if (uri.scheme === 'tree-grid') {
      factory = this.treeGridModelFactory
    } else {
      throw new Error(`unknown uri, ${uri}`)
    }

    if (!this.resourceGridMap.has(key)) {
      this.resourceGridMap.set(key, factory())
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
        id: ResourceWidgetFactory.ID + ':' + uriAsKey(options.uri) + ':' + options.counter,
        uri: options.uri,
        title: getUriDisplayName(uri),
        model: treeGridModel,
      })
      return Promise.resolve(widget as unknown as EditorWidget)
    }

    if (uri.scheme === 'grid') {
      const gridModel = this.getOrCreateGridModel(uri) as GridModel
      gridModel.resetRefPromise(uri)
      const widget = new ResourceGridWidget({
        id: ResourceWidgetFactory.ID + ':' + uriAsKey(options.uri) + ':' + options.counter,
        uri: options.uri,
        title: getUriDisplayName(uri),
        model: gridModel,
      })
      return Promise.resolve(widget as unknown as EditorWidget)
    }

    return super.createWidget(options)
  }
}
