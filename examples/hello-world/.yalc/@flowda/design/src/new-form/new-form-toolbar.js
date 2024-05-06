import { __decorate } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Flex } from '@rebass/grid/emotion';
import { observer } from 'mobx-react';
import * as React from 'react';
import { EUI_DARK_COLORS, EUI_LIGHT_COLORS } from '../theme/theme.model';
import { FEuiButtonEmpty } from '../eui';
let NewFormToolbar = class NewFormToolbar extends React.Component {
    render() {
        return (_jsx(Flex, { px: 1, py: 2, mx: -1, style: { height: 40 }, children: _jsx(Box, { mx: 1, children: _jsx(FEuiButtonEmpty, { "x-color": this.props.model.theme.colorMode === 'light' ? EUI_LIGHT_COLORS.text : EUI_DARK_COLORS.text, onClick: () => { }, iconType: "save", size: "xs", color: "text", children: "Save" }) }) }));
    }
};
NewFormToolbar = __decorate([
    observer
], NewFormToolbar);
export { NewFormToolbar };
//# sourceMappingURL=new-form-toolbar.js.map