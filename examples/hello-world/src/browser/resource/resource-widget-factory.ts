import { EditorWidgetFactory } from '@theia/editor/lib/browser/editor-widget-factory'
import { inject, injectable } from '@theia/core/shared/inversify'
import { EditorWidget } from '@theia/editor/lib/browser'
import { NavigatableWidgetOptions } from '@theia/core/lib/browser'
import { URI } from '@theia/core'
import { ManageableService } from '@flowda/design'
import {
  MANAGEABLE_EDITOR_ID,
  type ManageableModel,
  ManageableServiceSymbol,
  NOT_REGISTERED_SCHEME,
} from '@flowda/types'

@injectable()
export class ResourceWidgetFactory extends EditorWidgetFactory {
  @inject(ManageableServiceSymbol) private readonly manageableService: ManageableService

  static override ID = MANAGEABLE_EDITOR_ID
  override readonly id = ResourceWidgetFactory.ID

  static override createID(uri: URI, counter?: number): string {
    return ResourceWidgetFactory.ID
      + `:${uri.toString(true)}`
      + (counter !== undefined ? `:${counter}` : '')
  }

  public getOrCreateGridModel(uri: URI | string): ManageableModel {
    return this.manageableService.getOrCreateGridModel(uri)
  }

  override async createWidget(options: NavigatableWidgetOptions): Promise<EditorWidget> {
    try {
      const widget = this.manageableService.createWidget({
        uri: options.uri,
        counter: options.counter,
      })
      return Promise.resolve(widget as unknown as EditorWidget)
    } catch (e) {
      if (e instanceof Error && e.message.indexOf(NOT_REGISTERED_SCHEME) > -1) {
        return super.createWidget(options)
      } else {
        throw e
      }
    }
  }
}
