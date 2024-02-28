import { __decorate, __metadata, __param } from "tslib";
import { action, makeObservable, observable } from 'mobx';
import { inject, injectable } from 'inversify';
let LoginModel = class LoginModel {
    constructor(trpcFactory) {
        this.trpcFactory = trpcFactory;
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
    async login(accept) {
        if (!this.formikProps)
            throw new Error();
        this.formikProps.setSubmitting(true);
        try {
            const res = await this.trpcFactory().hello.validate.mutate(this.formikProps.values);
            localStorage.setItem('access_token', res.at.token);
            this.setIsLogin(true);
            if (typeof accept === 'function') {
                await accept();
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
    __param(0, inject('trpcFactory')),
    __metadata("design:paramtypes", [Function])
], LoginModel);
export { LoginModel };
//# sourceMappingURL=login.model.js.map