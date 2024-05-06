import { __decorate } from "tslib";
import { ContainerModule, injectable } from 'inversify';
import { LoginModel } from './login/login.model';
import { ApiServiceSymbol, GridModelSymbol, LoginModelSymbol, ManageableModelFactorySymbol, ManageableModelSymbol, ManageableServiceSymbol, NewFormModelSymbol, PreviewModelSymbol, TaskFormModelSymbol, ThemeModelSymbol, TreeGridModelSymbol, } from '@flowda/types';
import { PreviewModel } from './preview/preview.model';
import { GridModel } from './grid/grid.model';
import { ThemeModel } from './theme/theme.model';
import { TreeGridModel } from './tree-grid/tree-grid.model';
import { TaskFormModel } from './task-form/task-form.model';
import { NewFormModel } from './new-form/new-form.model';
import { ManageableService } from './manageable/manageable.sevice';
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
    bind(ManageableModelFactorySymbol)
        .toAutoNamedFactory(ManageableModelSymbol);
    // built in 
    bind(ManageableModelSymbol).to(GridModel).whenTargetNamed("grid");
    bind(ManageableModelSymbol).to(TreeGridModel).whenTargetNamed("tree-grid");
    bind(ManageableModelSymbol).to(TaskFormModel).whenTargetNamed("task");
    bind(ManageableModelSymbol).to(NewFormModel).whenTargetNamed("new-form");
};
//# sourceMappingURL=designModule.js.map