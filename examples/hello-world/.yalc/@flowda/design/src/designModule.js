import { __decorate } from "tslib";
import { ContainerModule, injectable } from 'inversify';
import { LoginModel } from './login/login.model';
import { GridModelSymbol, LoginModelSymbol, PreviewModelSymbol, ThemeModelSymbol, TreeGridModelSymbol, TaskFormModelSymbol, ApiServiceSymbol, } from '@flowda/types';
import { PreviewModel } from './preview/preview.model';
import { GridModel } from './grid/grid.model';
import { ThemeModel } from './theme/theme.model';
import { TreeGridModel } from './tree-grid/tree-grid.model';
import { TaskFormModel } from './task-form/task-form.model';
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
};
//# sourceMappingURL=designModule.js.map