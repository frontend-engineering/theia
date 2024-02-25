// tslint:disable:file-header
import '../../src/browser/style/branding.css'

import { bindContribution, CommandContribution, FilterContribution, URI } from '@theia/core'
import { ContainerModule, interfaces } from '@theia/core/shared/inversify'
import {
  FrontendApplicationContribution,
  KeybindingRegistry,
  open,
  OpenerService,
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
import { bindDesignModule, GridModel } from '@flowda-projects/flowda-theia-design'
import { CreateTRPCProxyClient } from '@trpc/client'
import type { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { GridModelSymbol } from '@flowda-projects/flowda-shared-types'
import { environment } from './environments/environment'
import { HelloFrontendContribution } from './hello-frontend-contribution'

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

    bindDesignModule(bind)

    bind<interfaces.Factory<GridModel>>('Factory<GridModel>').toFactory<GridModel>(context => {
      return () => {
        const grid = context.container.get<GridModel>(GridModelSymbol)
        const openerService = context.container.get<OpenerService>(OpenerService)
        grid.handlers.onClickRef = v => {
          const k = GridModel.KEY
          const resourceQuery = localStorage.getItem(k)
          let prev: Record<string, unknown> = {}
          // eslint-disable-next-line no-null/no-null
          if (resourceQuery != null) {
            try {
              prev = JSON.parse(resourceQuery)
            } catch (e) {
              prev = {}
            }
          }
          prev[v.schemaName] = {
            _ref: '1',
            id: { filterType: 'number', type: 'equals', filter: v.id },
          }
          localStorage.setItem(k, JSON.stringify(prev))

          open(openerService, {
            scheme: v.schemaName,
            name: v.name,
          } as unknown as URI, {
            mode: 'reveal',
            preview: true,
          })
        }
        return grid
      }
    })

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
  },
)
