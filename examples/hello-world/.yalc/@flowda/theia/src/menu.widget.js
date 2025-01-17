import { __decorate, __metadata, __param } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { ManageableWidget } from './manageable/manageable.widget';
import { injectable, unmanaged } from 'inversify';
import { TreeGrid, TreeGridModel } from '@flowda/design';
let MenuWidget = class MenuWidget extends ManageableWidget {
    constructor(model) {
        super();
        this.model = model;
    }
    render() {
        if (this.model == null)
            return null;
        return _jsx(TreeGrid, { model: this.model });
    }
};
MenuWidget.ID = 'menu-widget';
MenuWidget = __decorate([
    injectable(),
    __param(0, unmanaged()),
    __metadata("design:paramtypes", [TreeGridModel])
], MenuWidget);
export { MenuWidget };
//# sourceMappingURL=menu.widget.js.map