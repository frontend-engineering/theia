import { EditorWidgetFactory } from '@theia/editor/lib/browser/editor-widget-factory'
import { injectable } from '@theia/core/shared/inversify'
import { NavigatableWidgetOptions } from '@theia/core/lib/browser'
import { EditorWidget } from '@theia/editor/lib/browser'
import URI from '@theia/core/lib/common/uri'

@injectable()
export class ResourceWidgetFactory extends EditorWidgetFactory {
  static override ID = 'resource-editor-opener';
  override readonly id = ResourceWidgetFactory.ID;
}
