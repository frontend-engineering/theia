import { __decorate } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex } from '@rebass/grid/emotion';
import { observer } from 'mobx-react';
import * as React from 'react';
import { EUI_DARK_COLORS, EUI_LIGHT_COLORS } from '../theme/theme.model';
import { FEuiButtonEmpty } from '../eui';
import { getBtnTextColor } from '../theme/theme-utils';
let GridToolbar = class GridToolbar extends React.Component {
    render() {
        return (_jsxs(Flex, { px: 1, py: 2, mx: -1, style: { height: 40 }, children: [_jsxs(Box, { mx: 1, children: [_jsx(FEuiButtonEmpty, { "x-color": this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text, onClick: () => {
                                void this.props.model.refresh(true);
                            }, iconType: "refresh", size: "xs", color: "text", children: "Refresh" }), _jsx(FEuiButtonEmpty, { "x-color": this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text, onClick: () => this.props.model.onNewForm(), iconType: "plus", size: "xs", color: "text", children: "New" })] }), _jsx(Box, { mx: 1, children: _jsx(FEuiButtonEmpty, { "x-color": this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text, onClick: () => { }, iconType: "filter", size: "xs", color: "text", children: "Filter" }) }), _jsx(Box, { mx: 1, children: _jsx(FEuiButtonEmpty, { "x-color": this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text, onClick: () => { }, iconType: "sortable", size: "xs", color: "text", children: "Sort" }) }), _jsx(Box, { mx: 1, children: _jsx(FEuiButtonEmpty, { "x-color": getBtnTextColor(this.props.model.theme.colorMode, this.props.model.selectedRowPk == null), onClick: () => this.props.model.remove(), iconType: "trash", size: "xs", color: "text", isDisabled: this.props.model.selectedRowPk == null, children: "Delete" }) }), _jsx(Box, { mx: 1, children: _jsx(FEuiButtonEmpty, { "x-color": this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text, onClick: () => { }, iconType: "gradient", size: "xs", color: "text", children: "Column" }) })] }));
    }
};
GridToolbar = __decorate([
    observer
], GridToolbar);
export { GridToolbar };
//# sourceMappingURL=grid-toolbar.js.map