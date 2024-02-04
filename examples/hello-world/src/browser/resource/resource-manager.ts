import { EditorManager, EditorOpenerOptions, EditorWidget, WidgetId } from '@theia/editor/lib/browser'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ResourceWidgetFactory } from './resource-widget-factory'
import URI from '@theia/core/lib/common/uri'
import { NavigatableWidgetOptions, WidgetOpenerOptions } from '@theia/core/lib/browser'
import { ResourceWidget } from './resource-widget'
import { ILogger } from '@theia/core'
import { GridModel } from '@flowda-projects/flowda-theia-design'

const WIDGET_ID_REG = /resource-editor-opener:resource:\/\/\/(.*):\d/

@injectable()
export class ResourceManager extends EditorManager {
  override readonly id = ResourceWidgetFactory.ID
  override readonly label = 'Resource Editor'

  @inject(ILogger) protected logger: ILogger
  @inject(GridModel) protected readonly gridModel: GridModel

  @postConstruct()
  protected override init(): void {
    super.init()
    this.onCurrentEditorChanged((widget) => {
      if (widget && WIDGET_ID_REG.test(widget.id)) {
        const ret = widget.id.match(WIDGET_ID_REG)
        if (ret) {
          this.gridModel.getColAndDataByDisplayName(ret[1])
        }
      }
    })
  }

  override canHandle(uri: URI, options?: WidgetOpenerOptions): number {
    return 110 // > EditorManger 100
  }

  override open(uri: URI, options?: EditorOpenerOptions): Promise<EditorWidget> {
    return super.open(uri, options)
  }

  protected override extractIdFromWidget(widget: any): WidgetId {
    if (widget instanceof ResourceWidget) {
      // @ts-expect-error
      const uri = widget.uri.toString()
      const id = Number(widget.id.slice(widget.id.lastIndexOf(':') + 1))
      return { id, uri }
    } else {
      return super.extractIdFromWidget(widget)
    }
  }

  protected override createWidgetOptions(uri: URI, options?: EditorOpenerOptions): NavigatableWidgetOptions {
    if (uri.scheme === 'resource') {
      return {
        counter: options?.counter,
        kind: 'navigatable',
        // @ts-expect-error
        uri: `${uri.scheme}:///${uri.name}`,
      }
    }
    return super.createWidgetOptions(uri, options)
  }

}
