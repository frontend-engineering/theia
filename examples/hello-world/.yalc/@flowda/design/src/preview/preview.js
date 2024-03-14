import { __decorate } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from 'react';
import { observer } from 'mobx-react';
let Preview = class Preview extends Component {
    render() {
        return (_jsx("div", { children: _jsx("p", { children: this.props.model.hi }) }));
    }
};
Preview = __decorate([
    observer
], Preview);
export { Preview };
//# sourceMappingURL=preview.js.map