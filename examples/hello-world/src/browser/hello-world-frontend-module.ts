// tslint:disable:file-header
import '../../src/browser/style/branding.css'

import { bindContribution, CommandContribution, FilterContribution } from '@theia/core'
import { ContainerModule, interfaces } from '@theia/core/shared/inversify'
import {
  KeybindingRegistry,
  OpenHandler,
  ShellLayoutRestorer,
  SidebarBottomMenuWidgetFactory,
  WidgetFactory,
} from '@theia/core/lib/browser'
import { HelloShellLayoutRestorer } from './hello-shell-layout-restorer'
import { HelloFilterContribution } from './hello-filter-contribution'
import { SampleCommandContribution } from './sample-command-contribution'
import { FILE_NAVIGATOR_ID, NavigatorWidgetFactory } from '@theia/navigator/lib/browser'
import { createHelloFileNavigatorWidget } from './navigator/hello-navigator-container'
import { HelloFileNavigatorWidget } from './navigator/hello-navigator-widget'
import { HelloNavigatorWidgetFactory } from './navigator/hello-navigator-widget-factory'
import { ResourceWidgetFactory } from './resource/resource-widget-factory'
import { ResourceManager } from './resource/resource-manager'
import { LoginDialog } from './login/login-dialog'
import { LoginModel } from './login/login.model'
import { HelloKeybindingRegistry } from './hello-keybinding'
import { TrpcProxyClient } from './trpc/trpc-client'
// import { ResourceModel } from './resource/resource.model'
import { SampleColorContribution } from './sample-color-contribution'
import { ColorContribution } from '@theia/core/lib/browser/color-application-contribution'

import { ThemeService } from '@theia/core/lib/browser/theming'
import { HelloThemeService } from './hello-theming'
import { MonacoThemeRegistry } from '@theia/monaco/lib/browser/textmate/monaco-theme-registry'
import { HelloMonacoThemeRegistry } from './textmate/hello-monaco-theme-registry'
import { HelloSidebarBottomMenuWidget } from './shell/hello-sidebar-bottom-menu-widget'
import { GridModel } from '@flowda-projects/flowda-theia-design'
import { CreateTRPCProxyClient } from '@trpc/client'
import { AppRouter } from '@flowda-projects/flowda-services-trpc-server'

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

    bind(ColorContribution)
      .to(SampleColorContribution)
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
    bind(GridModel).toSelf().inRequestScope()

    bind(ResourceManager).toSelf().inSingletonScope()
    bind(OpenHandler).toService(ResourceManager)

    bind(LoginDialog).toSelf().inSingletonScope()
    bind(LoginModel).toSelf().inSingletonScope()

    bind(TrpcProxyClient).toSelf().inSingletonScope()
    bind<interfaces.Factory<CreateTRPCProxyClient<AppRouter>>>('trpcFactory').toFactory<CreateTRPCProxyClient<AppRouter>, []>(context => () => {
      return context.container.get<TrpcProxyClient>(TrpcProxyClient).client
    })

    // fix input autocomplete KeyboardEvent 没有 code
    rebind(KeybindingRegistry).to(HelloKeybindingRegistry).inSingletonScope()

    bind(HelloThemeService).toSelf().inSingletonScope()
    rebind(ThemeService).toService(HelloThemeService)

    rebind(MonacoThemeRegistry).to(HelloMonacoThemeRegistry).inSingletonScope()

    bind(HelloSidebarBottomMenuWidget).toSelf()
    rebind(SidebarBottomMenuWidgetFactory).toAutoFactory(HelloSidebarBottomMenuWidget)

  },
)
