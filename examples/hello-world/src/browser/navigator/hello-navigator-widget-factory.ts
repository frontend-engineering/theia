import { injectable } from '@theia/core/shared/inversify'
import {
  EXPLORER_VIEW_CONTAINER_ID,
  EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS,
  NavigatorWidgetFactory,
} from '@theia/navigator/lib/browser'
import { ViewContainer } from '@theia/core/lib/browser'

export const HELLO_FILE_NAVIGATOR_ID = 'files-hello'

@injectable()
export class HelloNavigatorWidgetFactory extends NavigatorWidgetFactory {
  override async createWidget(): Promise<ViewContainer> {
    const viewContainer = this.viewContainerFactory({
      id: EXPLORER_VIEW_CONTAINER_ID,
      progressLocationId: 'explorer',
    })
    viewContainer.setTitleOptions(EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS)
    // const openEditorsWidget = await this.widgetManager.getOrCreateWidget(OpenEditorsWidget.ID)
    // const navigatorWidget = await this.widgetManager.getOrCreateWidget(FILE_NAVIGATOR_ID)
    // viewContainer.addWidget(navigatorWidget, this.fileNavigatorWidgetOptions)
    // viewContainer.addWidget(openEditorsWidget, this.openEditorsWidgetOptions)
    const helloNavigatorWidget = await this.widgetManager.getOrCreateWidget(HELLO_FILE_NAVIGATOR_ID)
    viewContainer.addWidget(helloNavigatorWidget, {
      order: 2,
      canHide: false,
      initiallyCollapsed: false,
      weight: 80,
      disableDraggingToOtherContainers: true,
    })
    return viewContainer
  }
}
