import { ContainerModule } from 'inversify';
import { LoginModel } from './login/login.model';
import { LoginModelSymbol, PreviewModelSymbol, GridModelSymbol, ThemeModelSymbol } from '@flowda/types';
import { PreviewModel } from './preview/preview.model';
import { GridModel } from './grid/grid.model';
import { ThemeModel } from './theme/theme.model';
export const designModule = new ContainerModule(bind => {
    bindDesignModule(bind);
});
export const bindDesignModule = (bind) => {
    bind(ThemeModelSymbol).to(ThemeModel).inSingletonScope();
    bind(LoginModelSymbol).to(LoginModel).inSingletonScope();
    bind(PreviewModelSymbol).to(PreviewModel).inSingletonScope();
    bind(GridModelSymbol).to(GridModel).inSingletonScope();
};
//# sourceMappingURL=designModule.js.map