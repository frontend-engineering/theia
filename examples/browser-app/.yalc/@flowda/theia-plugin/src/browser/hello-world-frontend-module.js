"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:file-header
require("../../src/browser/style/branding.css");
require("./resource/reference-preview");
const core_1 = require("@theia/core");
const inversify_1 = require("@theia/core/shared/inversify");
const browser_1 = require("@theia/core/lib/browser");
const hello_shell_layout_restorer_1 = require("./hello-shell-layout-restorer");
const hello_filter_contribution_1 = require("./hello-filter-contribution");
const sample_command_contribution_1 = require("./sample-command-contribution");
const browser_2 = require("@theia/navigator/lib/browser");
const hello_navigator_container_1 = require("./navigator/hello-navigator-container");
const hello_navigator_widget_1 = require("./navigator/hello-navigator-widget");
const hello_navigator_widget_factory_1 = require("./navigator/hello-navigator-widget-factory");
const resource_widget_factory_1 = require("./resource/resource-widget-factory");
const resource_manager_1 = require("./resource/resource-manager");
const login_dialog_1 = require("./login/login-dialog");
const hello_keybinding_1 = require("./hello-keybinding");
const trpc_client_1 = require("./trpc/trpc-client");
// import { ResourceModel } from './resource/resource.model'
const sample_color_contribution_1 = require("./sample-color-contribution");
const color_application_contribution_1 = require("@theia/core/lib/browser/color-application-contribution");
const theming_1 = require("@theia/core/lib/browser/theming");
const hello_theming_1 = require("./hello-theming");
const monaco_theme_registry_1 = require("@theia/monaco/lib/browser/textmate/monaco-theme-registry");
const hello_monaco_theme_registry_1 = require("./textmate/hello-monaco-theme-registry");
const hello_sidebar_bottom_menu_widget_1 = require("./shell/hello-sidebar-bottom-menu-widget");
const design_1 = require("@flowda/design");
const types_1 = require("@flowda/types");
const environment_1 = require("./environments/environment");
const hello_frontend_contribution_1 = require("./hello-frontend-contribution");
const resource_grid_model_1 = require("./resource/resource-grid-model");
const sample_menu_contribution_1 = require("./sample-menu-contribution");
console.log('FLOWDA_URL', environment_1.environment.FLOWDA_URL);
exports.default = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    bind(core_1.CommandContribution)
        .to(sample_command_contribution_1.SampleCommandContribution)
        .inSingletonScope();
    bind(core_1.MenuContribution)
        .to(sample_menu_contribution_1.SampleMenuContribution)
        .inSingletonScope();
    bind(color_application_contribution_1.ColorContribution)
        .to(sample_color_contribution_1.SampleColorContribution)
        .inSingletonScope();
    bind(hello_filter_contribution_1.HelloFilterContribution)
        .toSelf()
        .inSingletonScope();
    (0, core_1.bindContribution)(bind, hello_filter_contribution_1.HelloFilterContribution, [core_1.FilterContribution]);
    rebind(browser_1.ShellLayoutRestorer)
        .to(hello_shell_layout_restorer_1.HelloShellLayoutRestorer)
        .inSingletonScope();
    bind(hello_navigator_widget_1.HelloFileNavigatorWidget).toDynamicValue(ctx => (0, hello_navigator_container_1.createHelloFileNavigatorWidget)(ctx.container));
    bind(browser_1.WidgetFactory)
        .toDynamicValue(({ container }) => ({
        id: browser_2.FILE_NAVIGATOR_ID + '-hello',
        createWidget: () => container.get(hello_navigator_widget_1.HelloFileNavigatorWidget),
    }))
        .inSingletonScope();
    rebind(browser_2.NavigatorWidgetFactory)
        .to(hello_navigator_widget_factory_1.HelloNavigatorWidgetFactory)
        .inSingletonScope();
    bind(resource_widget_factory_1.ResourceWidgetFactory).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toService(resource_widget_factory_1.ResourceWidgetFactory);
    (0, design_1.bindDesignModule)(bind);
    rebind(types_1.GridModelSymbol).to(resource_grid_model_1.ResourceGridModel).inTransientScope();
    bind('Factory<GridModel>').toFactory(context => {
        return () => {
            return context.container.get(types_1.GridModelSymbol);
        };
    });
    bind(resource_manager_1.ResourceManager).toSelf().inSingletonScope();
    bind(browser_1.OpenHandler).toService(resource_manager_1.ResourceManager);
    bind(login_dialog_1.LoginDialog).toSelf().inSingletonScope();
    bind(trpc_client_1.TrpcProxyClient).toSelf().inSingletonScope();
    bind('trpcFactory').toFactory(context => () => {
        return context.container.get(trpc_client_1.TrpcProxyClient).client;
    });
    // fix input autocomplete KeyboardEvent 没有 code
    rebind(browser_1.KeybindingRegistry).to(hello_keybinding_1.HelloKeybindingRegistry).inSingletonScope();
    bind(hello_theming_1.HelloThemeService).toSelf().inSingletonScope();
    rebind(theming_1.ThemeService).toService(hello_theming_1.HelloThemeService);
    rebind(monaco_theme_registry_1.MonacoThemeRegistry).to(hello_monaco_theme_registry_1.HelloMonacoThemeRegistry).inSingletonScope();
    bind(hello_sidebar_bottom_menu_widget_1.HelloSidebarBottomMenuWidget).toSelf();
    rebind(browser_1.SidebarBottomMenuWidgetFactory).toAutoFactory(hello_sidebar_bottom_menu_widget_1.HelloSidebarBottomMenuWidget);
    bind(browser_1.FrontendApplicationContribution)
        .to(hello_frontend_contribution_1.HelloFrontendContribution)
        .inSingletonScope();
});
//# sourceMappingURL=hello-world-frontend-module.js.map