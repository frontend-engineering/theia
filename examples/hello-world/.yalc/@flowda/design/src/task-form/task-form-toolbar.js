import { __decorate } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Flex } from '@rebass/grid/emotion';
import { observer } from 'mobx-react';
import * as React from 'react';
import { EUI_DARK_COLORS, EUI_LIGHT_COLORS } from '../theme/theme.model';
import { FEuiButtonEmpty } from '../eui';
let TaskFormToolbar = class TaskFormToolbar extends React.Component {
    render() {
        return (_jsxs(Flex, { px: 1, py: 2, mx: -1, style: { height: 40 }, children: [_jsx(Box, { mx: 1, children: _jsx(FEuiButtonEmpty, { "x-color": this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text, onClick: () => { }, iconType: "push", size: "xs", color: "text", children: "Approve" }) }), _jsx(Box, { mx: 1, children: _jsx(FEuiButtonEmpty, { "x-color": this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text, onClick: () => { }, iconType: "returnKey", size: "xs", color: "text", children: "Reject" }) })] }));
    }
};
TaskFormToolbar = __decorate([
    observer
], TaskFormToolbar);
export { TaskFormToolbar };
//# sourceMappingURL=task-form-toolbar.js.map