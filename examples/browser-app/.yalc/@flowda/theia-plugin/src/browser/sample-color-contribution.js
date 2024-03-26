"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleColorContribution = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
let SampleColorContribution = class SampleColorContribution {
    registerColors(colors) {
        /*
        在 dark_linear 里进行覆盖
        e.g. "custom.dialogTitleBackground": "#FFFFFF00",
    
        其他主题的话，按照原先的 css var 设置好 fallback 策略
        e.g. 原先 .dialogTitle 是 statusBar.background
         */
        colors.register({
            id: 'custom.dialogTitleBackground',
            defaults: {
                dark: 'statusBar.background',
                light: 'statusBar.background',
                hcDark: 'statusBar.background',
                hcLight: 'statusBar.background',
            },
            description: 'Custom dialogTitle background color.',
        }, {
            id: 'custom.dialogBlockBackground',
            defaults: {
                dark: 'editorWidget.background',
                light: 'editorWidget.background',
                hcDark: 'editorWidget.background',
                hcLight: 'editorWidget.background',
            },
            description: 'Custom dialogBlock background color.',
        });
    }
};
exports.SampleColorContribution = SampleColorContribution;
exports.SampleColorContribution = SampleColorContribution = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], SampleColorContribution);
//# sourceMappingURL=sample-color-contribution.js.map