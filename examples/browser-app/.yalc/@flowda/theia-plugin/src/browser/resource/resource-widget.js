"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceWidget = void 0;
const browser_1 = require("@theia/core/lib/browser");
const React = require("@theia/core/shared/react");
const design_1 = require("@flowda/design");
class ResourceWidget extends browser_1.ReactWidget {
    constructor(option) {
        super();
        this.option = option;
        this.id = option.id;
        this.title.caption = option.title;
        this.title.label = option.title;
        this.title.iconClass = 'unclosable-window-icon';
        this.title.closable = true;
        this.update();
    }
    render() {
        return (
        // todo: 使用 theia 的 parent className 修改主题直接切换 ag grid theme css var
        React.createElement("div", { className: "ag-theme-linear-dark", style: { height: '100%' } },
            React.createElement(design_1.Grid, { model: this.option.model })));
    }
}
exports.ResourceWidget = ResourceWidget;
ResourceWidget.ID = 'resource-widget';
//# sourceMappingURL=resource-widget.js.map