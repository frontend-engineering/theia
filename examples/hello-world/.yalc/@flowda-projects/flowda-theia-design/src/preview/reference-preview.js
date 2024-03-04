import { __decorate, __metadata } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let ReferencePreview = class ReferencePreview extends LitElement {
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
        return html `
        <div class="euiFormRow euiFormRow--hasLabel euiFormRow--compressed">
            <span>123</span>
            ${this.values.map(item => html `
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
__decorate([
    property(),
    __metadata("design:type", Array)
], ReferencePreview.prototype, "values", void 0);
ReferencePreview = __decorate([
    customElement('reference-preview')
], ReferencePreview);
export { ReferencePreview };
//# sourceMappingURL=reference-preview.js.map