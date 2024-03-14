import { ContainerModule } from 'inversify';
import { LoginModel } from './login/login.model';
import { LoginModelSymbol, PreviewModelSymbol, GridModelSymbol } from '@flowda/types';
import { PreviewModel } from './preview/preview.model';
import { GridModel } from './grid/grid.model';
export const designModule = new ContainerModule(bind => {
    bindDesignModule(bind);
});
export const bindDesignModule = (bind) => {
    bind(LoginModelSymbol).to(LoginModel).inSingletonScope();
    bind(PreviewModelSymbol).to(PreviewModel).inSingletonScope();
    bind(GridModelSymbol).to(GridModel).inSingletonScope();
};
//# sourceMappingURL=designModule.js.map