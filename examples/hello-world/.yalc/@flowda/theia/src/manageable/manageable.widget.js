import { __decorate } from "tslib";
import { ReactWidget } from '@theia/core/lib/browser';
import { injectable } from 'inversify';
let ManageableWidget = class ManageableWidget extends ReactWidget {
};
ManageableWidget = __decorate([
    injectable()
], ManageableWidget);
export { ManageableWidget };
//# sourceMappingURL=manageable.widget.js.map