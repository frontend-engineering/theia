import { __awaiter, __decorate, __metadata } from "tslib";
import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
let LoginModel = class LoginModel {
    constructor() {
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
    __metadata("design:paramtypes", [])
], LoginModel);
export { LoginModel };
//# sourceMappingURL=login.model.js.map