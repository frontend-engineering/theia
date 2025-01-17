// tslint:disable:file-header
import '../../src/browser/style/index.css'
import './resource/widgets/reference-preview'

import {
  bindContribution,
  CommandContribution,
  CommandRegistry,
  FilterContribution,
  MenuContribution,
} from '@theia/core'
import { ContainerModule, interfaces } from '@theia/core/shared/inversify'
import {
  FrontendApplicationContribution,
  KeybindingRegistry,
  OpenHandler,
  ShellLayoutRestorer,
  SidebarBottomMenuWidgetFactory,
  WidgetFactory,
  WidgetManager,
} from '@theia/core/lib/browser'
import { HelloShellLayoutRestorer } from './hello-shell-layout-restorer'
import { HelloFilterContribution } from './hello-filter-contribution'
import { SampleCommandContribution } from './sample-command-contribution'
import { NavigatorWidgetFactory } from '@theia/navigator/lib/browser'
import { createHelloFileNavigatorWidget } from './navigator/hello-navigator-container'
import { HelloFileNavigatorWidget } from './navigator/hello-navigator-widget'
import { HELLO_FILE_NAVIGATOR_ID, HelloNavigatorWidgetFactory } from './navigator/hello-navigator-widget-factory'
import { ResourceWidgetFactory } from './resource/resource-widget-factory'
import { ResourceManager } from './resource/resource-manager'
import { LoginDialog } from './login/login-dialog'
import { HelloKeybindingRegistry } from './hello-keybinding'
import { TrpcProxyClient } from './trpc/trpc-client'
import { SampleColorContribution } from './sample-color-contribution'
import { ColorContribution } from '@theia/core/lib/browser/color-application-contribution'

import { ThemeService } from '@theia/core/lib/browser/theming'
import { HelloThemeService } from './hello-theming'
import { MonacoThemeRegistry } from '@theia/monaco/lib/browser/textmate/monaco-theme-registry'
import { HelloMonacoThemeRegistry } from './textmate/hello-monaco-theme-registry'
import { HelloSidebarBottomMenuWidget } from './shell/hello-sidebar-bottom-menu-widget'
import { bindDesignModule } from '@flowda/design'
import { bindTheiaModule, GridWidget, registerManageableFactory } from '@flowda/theia'
import { CreateTRPCProxyClient } from '@trpc/client'
import type { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { type ApiService, ApiServiceSymbol, GridModelSymbol } from '@flowda/types'
import { environment } from './environments/environment'
import { HelloFrontendContribution } from './hello-frontend-contribution'
import { ResourceGridModel } from './resource/resource-grid-model'
import { SampleMenuContribution } from './sample-menu-contribution'
import { MonacoQuickInputImplementation } from '@theia/monaco/lib/browser/monaco-quick-input-service'
import { HelloMonacoQuickInputService, ListElementDelegate } from './monaco/hello-monaco-quick-input-service'
import { TabBarToolbarContribution } from '@theia/core/lib/browser/shell/tab-bar-toolbar'
import { SampleTabBarToolbarContribution } from './sample-tab-bar-toolbar-contribution'
import { SampleCommandRegistry } from './sample-command-registry'
import { bindGettingStartedFrontendModule } from './getting-started/getting-started-frontend-module'
import { HelloWidgetManager } from './hello-widget-manager'
import { HelloApiService } from './services/hello-api-service'

console.log('FLOWDA_URL', environment.FLOWDA_URL)

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

    bind(MenuContribution)
      .to(SampleMenuContribution)
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
        id: HELLO_FILE_NAVIGATOR_ID,
        createWidget: () => container.get(HelloFileNavigatorWidget),
      }))
      .inSingletonScope()

    rebind(NavigatorWidgetFactory)
      .to(HelloNavigatorWidgetFactory)
      .inSingletonScope()

    bind(ResourceWidgetFactory).toSelf().inSingletonScope()
    bind(WidgetFactory).toService(ResourceWidgetFactory)

    bindDesignModule(bind)
    bindTheiaModule(bind)
    registerManageableFactory(bind, 'grid', ResourceGridModel, GridWidget)

    rebind(GridModelSymbol).to(ResourceGridModel).inTransientScope()

    bind(ResourceManager).toSelf().inSingletonScope()
    bind(OpenHandler).toService(ResourceManager)

    bind(LoginDialog).toSelf().inSingletonScope()

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
    bind(FrontendApplicationContribution)
      .to(HelloFrontendContribution)
      .inSingletonScope()

    rebind(MonacoQuickInputImplementation).to(HelloMonacoQuickInputService).inSingletonScope()

    bind(ListElementDelegate).toSelf().inSingletonScope()
    bind<interfaces.Factory<ListElementDelegate>>('Factory<ListElementDelegate>').toFactory<ListElementDelegate>(context => {
      return () => {
        return context.container.get<ListElementDelegate>(ListElementDelegate)
      }
    })
    bind(TabBarToolbarContribution).to(SampleTabBarToolbarContribution).inSingletonScope()

    rebind(CommandRegistry).to(SampleCommandRegistry).inSingletonScope().onActivation(({ container }, registry) => {
      // WebSocketConnectionProvider.createHandler(container, commandServicePath, registry)
      return registry
    })

    bindGettingStartedFrontendModule(bind)
    rebind(WidgetManager).to(HelloWidgetManager).inSingletonScope()
    rebind<ApiService>(ApiServiceSymbol).to(HelloApiService).inSingletonScope()

    /* bind(HelloWsConnectionSource).toSelf().inSingletonScope()
    if (isBound(WebSocketConnectionSource)) {
      rebind(WebSocketConnectionSource).to(HelloWsConnectionSource).inSingletonScope()
    } else {
      bind(WebSocketConnectionSource).to(HelloWsConnectionSource).inSingletonScope()
    }

    if (isBound(ConnectionSource)) {
      rebind(ConnectionSource).toService(HelloWsConnectionSource)
    } else {
      bind(ConnectionSource).toService(HelloWsConnectionSource)
    }

    rebind(backendServiceProvider).toDynamicValue(ctx => {
      rebind(ServiceConnectionProvider).toSelf().inSingletonScope()
      const container = ctx.container.createChild()
      return container.get(ServiceConnectionProvider)
    }).inSingletonScope()*/
  },
)
