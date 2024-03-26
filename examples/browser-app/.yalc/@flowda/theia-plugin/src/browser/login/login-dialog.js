"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDialog = void 0;
const tslib_1 = require("tslib");
const React = require("@theia/core/shared/react");
const inversify_1 = require("@theia/core/shared/inversify");
const react_dialog_1 = require("@theia/core/lib/browser/dialogs/react-dialog");
const about_dialog_1 = require("@theia/core/lib/browser/about-dialog");
const core_1 = require("@theia/core");
const dialogs_1 = require("@theia/core/lib/browser/dialogs");
const design_1 = require("@flowda/design");
const types_1 = require("@flowda/types");
let LoginDialog = class LoginDialog extends react_dialog_1.ReactDialog {
    constructor(props, messageService, login, logger) {
        super({
            title: 'Login',
        });
        this.props = props;
        this.messageService = messageService;
        this.login = login;
        this.logger = logger;
        this.appendAcceptButton(dialogs_1.Dialog.OK);
    }
    render() {
        return React.createElement("div", { className: about_dialog_1.ABOUT_CONTENT_CLASS },
            React.createElement(design_1.Login, { model: this.login }));
    }
    onAfterAttach(msg) {
        const _super = Object.create(null, {
            onAfterAttach: { get: () => super.onAfterAttach }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            _super.onAfterAttach.call(this, msg);
            this.login.checkLogin();
            this.update();
        });
    }
    get value() { return undefined; }
    accept() {
        const _super = Object.create(null, {
            accept: { get: () => super.accept }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.login.isLogin) {
                yield _super.accept.call(this);
            }
            else {
                // todo: 这块逻辑可以不依赖 theia
                yield this.login.login(_super.accept.bind(this));
            }
        });
    }
};
exports.LoginDialog = LoginDialog;
exports.LoginDialog = LoginDialog = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(about_dialog_1.AboutDialogProps)),
    tslib_1.__param(1, (0, inversify_1.inject)(core_1.MessageService)),
    tslib_1.__param(2, (0, inversify_1.inject)(types_1.LoginModelSymbol)),
    tslib_1.__param(3, (0, inversify_1.inject)(core_1.ILogger)),
    tslib_1.__metadata("design:paramtypes", [about_dialog_1.AboutDialogProps,
        core_1.MessageService,
        design_1.LoginModel, Object])
], LoginDialog);
//# sourceMappingURL=login-dialog.js.map