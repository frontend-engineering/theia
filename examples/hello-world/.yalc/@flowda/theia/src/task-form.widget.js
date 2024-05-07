import { __decorate, __metadata, __param } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { ManageableWidget } from './manageable/manageable.widget';
import { injectable, unmanaged } from 'inversify';
import { TaskForm, TaskFormModel } from '@flowda/design';
let TaskFormWidget = class TaskFormWidget extends ManageableWidget {
    constructor(model) {
        super();
        this.model = model;
    }
    render() {
        if (this.model == null)
            return null;
        return _jsx(TaskForm, { model: this.model });
    }
};
TaskFormWidget.ID = 'task-from-widget';
TaskFormWidget = __decorate([
    injectable(),
    __param(0, unmanaged()),
    __metadata("design:paramtypes", [TaskFormModel])
], TaskFormWidget);
export { TaskFormWidget };
//# sourceMappingURL=task-form.widget.js.map