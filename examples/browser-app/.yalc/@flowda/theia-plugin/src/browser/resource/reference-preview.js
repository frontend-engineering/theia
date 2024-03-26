"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferencePreview = void 0;
const tslib_1 = require("tslib");
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
let ReferencePreview = class ReferencePreview extends lit_1.LitElement {
    constructor() {
        super(...arguments);
        this.values = [
            {
                label: 'Id',
                value: 2,
            },
            {
                label: '创建于',
                value: '2024-02-28T08:22:42.201Z',
            },
            {
                label: '类型',
                value: 'AMOUNT',
            },
            {
                label: '次数',
                value: 100,
            },
        ];
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return (0, lit_1.html) `
        <div class="euiFormRow euiFormRow--hasLabel euiFormRow--compressed">
            ${this.values.map(item => (0, lit_1.html) `
                        <div class="euiFormRow__labelWrapper">
                            <label class="euiFormLabel euiFormRow__label">${item.label}</label>
                        </div>
                        <div class="euiFormRow__fieldWrapper">
                            <div class="euiFormControlLayout euiFormControlLayout--compressed">
                                <div class="euiFormControlLayout__childrenWrapper">
                                    <span class="euiFieldText euiFieldText--compressed euiFieldText--custom">${item.value}</span>
                                </div>
                            </div>
                        </div>`)}
        </div>`;
    }
};
exports.ReferencePreview = ReferencePreview;
tslib_1.__decorate([
    (0, decorators_js_1.property)(),
    tslib_1.__metadata("design:type", Array)
], ReferencePreview.prototype, "values", void 0);
exports.ReferencePreview = ReferencePreview = tslib_1.__decorate([
    (0, decorators_js_1.customElement)('reference-preview')
], ReferencePreview);
//# sourceMappingURL=reference-preview.js.map