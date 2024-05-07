import { __decorate, __metadata, __param } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { ManageableWidget } from '../manageable/manageable.widget';
import { NewFormModel } from './new-form.model';
import { NewForm } from './new-form';
import { injectable, unmanaged } from 'inversify';
let NewFormWidget = class NewFormWidget extends ManageableWidget {
    constructor(model) {
        super();
        this.model = model;
    }
    render() {
        if (this.model == null)
            return null;
        return _jsx(NewForm, { model: this.model });
    }
};
NewFormWidget.ID = 'new-form-widget';
NewFormWidget = __decorate([
    injectable(),
    __param(0, unmanaged()),
    __metadata("design:paramtypes", [NewFormModel])
], NewFormWidget);
export { NewFormWidget };
//# sourceMappingURL=new-form.widget.js.map