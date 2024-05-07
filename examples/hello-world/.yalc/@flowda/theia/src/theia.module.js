import { ManageableService } from './manageable/manageable.service';
import { ManageableModelFactorySymbol, ManageableModelSymbol, ManageableServiceSymbol, ManageableWidgetFactorySymbol, ManageableWidgetSymbol, } from '@flowda/types';
import { registerManageableFactory } from './ioc-utils';
import { NewFormModel, TaskFormModel, TreeGridModel } from '@flowda/design';
import { MenuWidget } from './menu.widget';
import { TaskFormWidget } from './task-form.widget';
import { NewFormWidget } from './new-form.widget';
export const bindTheiaModule = (bind) => {
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
    // registerManageableFactory(bind, 'grid', GridModel, GridWidget)
    registerManageableFactory(bind, 'tree-grid', TreeGridModel, MenuWidget);
    registerManageableFactory(bind, 'task', TaskFormModel, TaskFormWidget);
    registerManageableFactory(bind, 'new-form', NewFormModel, NewFormWidget);
};
//# sourceMappingURL=theia.module.js.map