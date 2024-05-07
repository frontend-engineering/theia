import { __decorate, __metadata, __param } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { ManageableWidget } from '../manageable/manageable.widget';
import { GridModel } from './grid.model';
import { Grid } from './grid';
import { injectable, unmanaged } from 'inversify';
let GridWidget = class GridWidget extends ManageableWidget {
    constructor(model) {
        super();
        this.model = model;
    }
    render() {
        if (this.model == null)
            return null;
        return _jsx(Grid, { ref: ref => this.model.setRef(ref, this.uri), model: this.model, uri: this.uri });
    }
};
GridWidget.ID = 'grid-widget';
GridWidget = __decorate([
    injectable(),
    __param(0, unmanaged()),
    __metadata("design:paramtypes", [GridModel])
], GridWidget);
export { GridWidget };
//# sourceMappingURL=grid.widget.js.map