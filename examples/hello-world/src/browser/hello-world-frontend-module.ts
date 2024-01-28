// tslint:disable:file-header
import { bindContribution, CommandContribution, FilterContribution } from '@theia/core'
import { ContainerModule, interfaces } from '@theia/core/shared/inversify'
import { OpenHandler, ShellLayoutRestorer, WidgetFactory } from '@theia/core/lib/browser'
import { HelloShellLayoutRestorer } from './hello-shell-layout-restorer'
import { HelloFilterContribution } from './hello-filter-contribution'
import { SampleCommandContribution } from './sample-command-contribution'
import { FILE_NAVIGATOR_ID, NavigatorWidgetFactory } from '@theia/navigator/lib/browser'
import { createHelloFileNavigatorWidget } from './navigator/hello-navigator-container'
import { HelloFileNavigatorWidget } from './navigator/hello-navigator-widget'
import { HelloNavigatorWidgetFactory } from './navigator/hello-navigator-widget-factory'
import { ResourceWidgetFactory } from './resource/resource-widget-factory'
import { ResourceManager } from './resource/resource-manager'
import '../../src/browser/style/branding.css'
import { LoginDialog } from './login/login-dialog'

export default new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind(CommandContribution)
      .to(SampleCommandContribution)
      .inSingletonScope()

    bind(HelloFilterContribution)
      .toSelf()
      .inSingletonScope()
    bindContribution(bind, HelloFilterContribution, [FilterContribution])

    rebind(ShellLayoutRestorer)
      .to(HelloShellLayoutRestorer)
      .inSingletonScope()

    bind(HelloFileNavigatorWidget).toDynamicValue(ctx =>
      createHelloFileNavigatorWidget(ctx.container),
    )
    bind(WidgetFactory)
      .toDynamicValue(({ container }) => ({
        id: FILE_NAVIGATOR_ID + '-hello',
        createWidget: () => container.get(HelloFileNavigatorWidget),
      }))
      .inSingletonScope()

    rebind(NavigatorWidgetFactory)
      .to(HelloNavigatorWidgetFactory)
      .inSingletonScope()

    bind(ResourceWidgetFactory).toSelf().inSingletonScope()
    bind(WidgetFactory).toService(ResourceWidgetFactory)

    bind(ResourceManager).toSelf().inSingletonScope()
    bind(OpenHandler).toService(ResourceManager)


    bind(LoginDialog).toSelf().inSingletonScope()
  },
)
