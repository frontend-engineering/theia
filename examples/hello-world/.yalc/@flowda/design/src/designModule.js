import { __decorate } from "tslib";
import { ContainerModule, injectable } from 'inversify';
import { ApiServiceSymbol, GridModelSymbol, LoginModelSymbol, ManageableModelFactorySymbol, ManageableModelSymbol, ManageableServiceSymbol, ManageableWidgetFactorySymbol, ManageableWidgetSymbol, NewFormModelSymbol, PreviewModelSymbol, TaskFormModelSymbol, ThemeModelSymbol, TreeGridModelSymbol, } from '@flowda/types';
import { LoginModel } from './login/login.model';
import { PreviewModel } from './preview/preview.model';
import { GridModel } from './grid/grid.model';
import { ThemeModel } from './theme/theme.model';
import { TreeGridModel } from './tree-grid/tree-grid.model';
import { TaskFormModel } from './task-form/task-form.model';
import { NewFormModel } from './new-form/new-form.model';
import { ManageableService } from './manageable/manageable.service';
import { registerManageableFactory } from './ioc-utils';
import { GridWidget } from './grid/grid.widget';
import { MenuWidget } from './tree-grid/menu.widget';
import { TaskFormWidget } from './task-form/task-form.widget';
import { NewFormWidget } from './new-form/new-form.widget';
export const designModule = new ContainerModule(bind => {
    bindDesignModule(bind);
});
let NotImplementedApiService = class NotImplementedApiService {
    getResourceSchema(input) {
        throw new Error('handlers.getResourceSchema is not implemented');
    }
    getResourceData(input) {
        throw new Error('handlers.getResourceSchema is not implemented');
    }
    putResourceData(input) {
        throw new Error('handlers.getResourceSchema is not implemented');
    }
};
NotImplementedApiService = __decorate([
    injectable()
], NotImplementedApiService);
export { NotImplementedApiService };
export const bindDesignModule = (bind) => {
    bind(ApiServiceSymbol).to(NotImplementedApiService).inSingletonScope();
    bind(ThemeModelSymbol).to(ThemeModel).inSingletonScope();
    bind(LoginModelSymbol).to(LoginModel).inSingletonScope();
    bind(PreviewModelSymbol).to(PreviewModel).inSingletonScope();
    bind(GridModelSymbol).to(GridModel).inRequestScope();
    bind(TreeGridModelSymbol).to(TreeGridModel).inRequestScope();
    bind(TaskFormModelSymbol).to(TaskFormModel).inRequestScope();
    bind(NewFormModelSymbol).to(NewFormModel).inRequestScope();
    bind(ManageableServiceSymbol).to(ManageableService).inSingletonScope();
    bind(ManageableModelFactorySymbol).toAutoNamedFactory(ManageableModelSymbol);
    bind(ManageableWidgetFactorySymbol).toFactory((ctx) => {
        return (name) => (options) => {
            const widget = ctx.container.getNamed(ManageableWidgetSymbol, name);
            // theia ReactWidget
            widget.id = options.id;
            widget.title.caption = options.title;
            widget.title.label = options.title;
            widget.title.iconClass = 'unclosable-window-icon';
            widget.title.closable = true;
            // ManageableWidget
            widget.uri = options.uri;
            widget.model = options.model;
            // recall theia ReactWidget#render
            widget.update();
            return widget;
        };
    });
    // built in
    registerManageableFactory(bind, 'grid', GridModel, GridWidget);
    registerManageableFactory(bind, 'tree-grid', TreeGridModel, MenuWidget);
    registerManageableFactory(bind, 'task', TaskFormModel, TaskFormWidget);
    registerManageableFactory(bind, 'new-form', NewFormModel, NewFormWidget);
};
//# sourceMappingURL=designModule.js.map