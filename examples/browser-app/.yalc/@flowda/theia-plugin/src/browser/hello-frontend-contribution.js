"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloFrontendContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const types_1 = require("@flowda/types");
const design_1 = require("@flowda/design");
const core_1 = require("@theia/core");
let HelloFrontendContribution = class HelloFrontendContribution {
    constructor(login, messageService, trpcFactory) {
        this.login = login;
        this.messageService = messageService;
        this.trpcFactory = trpcFactory;
    }
    initialize() {
        this.login.handlers.info = this.messageService.info.bind(this.messageService);
        this.login.handlers.validate = this.trpcFactory().hello.validate.mutate;
    }
};
exports.HelloFrontendContribution = HelloFrontendContribution;
exports.HelloFrontendContribution = HelloFrontendContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(types_1.LoginModelSymbol)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.MessageService)),
    tslib_1.__param(2, (0, inversify_1.inject)('trpcFactory')),
    tslib_1.__metadata("design:paramtypes", [design_1.LoginModel,
        core_1.MessageService, Function])
], HelloFrontendContribution);
//# sourceMappingURL=hello-frontend-contribution.js.map