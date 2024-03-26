"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloSidebarBottomMenuWidget = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("@theia/core/shared/inversify");
const React = require("@theia/core/shared/react");
const sidebar_bottom_menu_widget_1 = require("@theia/core/lib/browser/shell/sidebar-bottom-menu-widget");
let HelloSidebarBottomMenuWidget = class HelloSidebarBottomMenuWidget extends sidebar_bottom_menu_widget_1.SidebarBottomMenuWidget {
    render() {
        return React.createElement(React.Fragment, null, this.menus.map(menu => {
            if (menu.id === 'settings-menu') {
                return React.createElement("div", { className: "custom-avatar-wrapper", key: menu.id, onClick: e => this.onClick(e, menu.menuPath), onMouseDown: this.onMouseDown, onMouseEnter: e => this.onMouseEnter(e, menu.title), onMouseLeave: this.onMouseOut },
                    React.createElement("div", { className: "custom-avatar" }, "SH"));
            }
            return React.createElement("i", { key: menu.id, className: menu.iconClass, onClick: e => this.onClick(e, menu.menuPath), onMouseDown: this.onMouseDown, onMouseEnter: e => this.onMouseEnter(e, menu.title), onMouseLeave: this.onMouseOut });
        }));
    }
};
exports.HelloSidebarBottomMenuWidget = HelloSidebarBottomMenuWidget;
exports.HelloSidebarBottomMenuWidget = HelloSidebarBottomMenuWidget = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], HelloSidebarBottomMenuWidget);
//# sourceMappingURL=hello-sidebar-bottom-menu-widget.js.map