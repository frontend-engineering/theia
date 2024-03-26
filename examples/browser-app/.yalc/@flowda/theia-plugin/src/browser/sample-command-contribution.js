"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleCommandContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const core_1 = require("@theia/core");
const login_dialog_1 = require("./login/login-dialog");
const resource_grid_model_1 = require("./resource/resource-grid-model");
const navigator_diff_1 = require("@theia/navigator/lib/browser/navigator-diff");
const filesystem_frontend_contribution_1 = require("@theia/filesystem/lib/browser/filesystem-frontend-contribution");
const browser_1 = require("@theia/core/lib/browser");
const browser_2 = require("@theia/workspace/lib/browser");
let SampleCommandContribution = class SampleCommandContribution {
    constructor(messageService, loginDialog) {
        this.messageService = messageService;
        this.loginDialog = loginDialog;
    }
    registerCommands(registry) {
        registry.registerCommand({
            id: 'command.examples.say-hi',
            category: 'Examples',
            label: 'Say Hi',
        }, {
            execute: () => {
                this.messageService.info('Hello world!');
            },
        });
        registry.registerCommand({
            id: 'command.hello.login',
            category: 'Examples',
            label: 'Login',
        }, {
            execute: () => {
                this.loginDialog.open();
            },
        });
        registry.registerCommand(resource_grid_model_1.GridCellCommand, {
            execute: () => {
                this.messageService.info('Open reference');
            },
            isEnabled: () => true,
            isVisible: () => true,
        });
        registry.unregisterCommand(navigator_diff_1.NavigatorDiffCommands.COMPARE_FIRST.id);
        registry.unregisterCommand(filesystem_frontend_contribution_1.FileSystemCommands.UPLOAD.id);
        registry.unregisterCommand(browser_1.CommonCommands.COPY.id);
        registry.unregisterCommand(browser_1.CommonCommands.PASTE.id);
        registry.unregisterCommand(browser_2.WorkspaceCommands.ADD_FOLDER.id);
    }
};
exports.SampleCommandContribution = SampleCommandContribution;
exports.SampleCommandContribution = SampleCommandContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(core_1.MessageService)),
    tslib_1.__param(1, (0, inversify_1.inject)(login_dialog_1.LoginDialog)),
    tslib_1.__metadata("design:paramtypes", [core_1.MessageService,
        login_dialog_1.LoginDialog])
], SampleCommandContribution);
//# sourceMappingURL=sample-command-contribution.js.map