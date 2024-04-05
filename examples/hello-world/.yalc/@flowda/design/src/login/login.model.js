import { __awaiter, __decorate, __metadata, __param } from "tslib";
import { action, makeObservable, observable, } from 'mobx';
import { injectable, inject } from 'inversify';
import { ThemeModelSymbol } from '@flowda/types';
import { ThemeModel } from '../theme/theme.model';
let LoginModel = class LoginModel {
    constructor(theme) {
        this.theme = theme;
        this.isLogin = false;
        this.handlers = {};
        makeObservable(this);
    }
    setIsLogin(isLogin) {
        this.isLogin = isLogin;
    }
    checkLogin() {
        const access_token = localStorage.getItem('access_token');
        this.setIsLogin(access_token != null);
    }
    login(accept) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.formikProps)
                throw new Error();
            this.formikProps.setSubmitting(true);
            try {
                if (typeof this.handlers.validate !== 'function') {
                    throw new Error('handlers.validate is not implemented!');
                }
                const res = yield this.handlers.validate(this.formikProps.values);
                localStorage.setItem('access_token', res.at.token);
                this.setIsLogin(true);
                if (typeof accept === 'function') {
                    yield accept();
                }
                if (typeof this.handlers.info === 'function') {
                    this.handlers.info('Login succeed!', {
                        timeout: 3000,
                    });
                }
            }
            catch (e) {
                console.error('[LoginDialog accept]', e);
            }
            this.formikProps.setSubmitting(false);
        });
    }
    logout() {
        localStorage.removeItem('access_token');
        this.setIsLogin(false);
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], LoginModel.prototype, "isLogin", void 0);
__decorate([
    action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], LoginModel.prototype, "setIsLogin", null);
LoginModel = __decorate([
    injectable(),
    __param(0, inject(ThemeModelSymbol)),
    __metadata("design:paramtypes", [ThemeModel])
], LoginModel);
export { LoginModel };
//# sourceMappingURL=login.model.js.map