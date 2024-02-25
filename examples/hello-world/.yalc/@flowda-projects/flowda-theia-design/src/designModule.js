import { ContainerModule } from 'inversify';
import { GridModel } from './grid/grid.model';
import { GridModelSymbol, LoginModelSymbol } from '@flowda-projects/flowda-shared-types';
import { LoginModel } from './login/login.model';
export const designModule = new ContainerModule(bind => {
    bindDesignModule(bind);
});
export const bindDesignModule = (bind) => {
    bind(GridModelSymbol).to(GridModel).inTransientScope();
    bind(LoginModelSymbol).to(LoginModel).inSingletonScope();
};
//# sourceMappingURL=designModule.js.map