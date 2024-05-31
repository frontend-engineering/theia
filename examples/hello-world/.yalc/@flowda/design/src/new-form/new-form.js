import { __decorate } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { Formik } from 'formik';
import { EuiFieldText, EuiFlexGrid, EuiFlexItem, EuiForm, EuiFormRow, EuiThemeProvider } from '@elastic/eui';
import { observer } from 'mobx-react';
import { NewFormToolbar } from './new-form-toolbar';
import { Box } from '@rebass/grid/emotion';
import { FEuiHorizontalRule } from '../eui';
import { toJS } from 'mobx';
export class NewForm extends Component {
    render() {
        return (_jsxs(EuiThemeProvider, { colorMode: this.props.model.theme.colorMode, children: [_jsx(NewFormToolbar, { model: this.props.model }), _jsx(FEuiHorizontalRule, {}), _jsx(Box, { mx: 3, children: _jsx(NewFormInner, { model: this.props.model }) })] }));
    }
}
let NewFormInner = class NewFormInner extends Component {
    render() {
        if (this.props.model.formItemColumns.length === 0)
            return _jsx("span", {});
        return (_jsx(Formik, { onSubmit: values => {
                this.props.model.submit();
            }, initialValues: toJS(this.props.model.defaultInitialValues), children: (formikProps) => {
                this.props.model.formikProps = formikProps;
                const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
                /* and other goodies */
                 } = formikProps;
                return (_jsx(EuiForm, { isInvalid: false, error: [], component: "form", children: this.props.model.formItemColumns.length === 0 ? null : (_jsx(EuiFlexGrid, { columns: 4, children: this.props.model.formItemColumns.map(col => {
                            return (_jsx(EuiFlexItem, { children: _jsx(EuiFormRow, { label: col.display_name, isInvalid: !!(touched[col.name] && errors[col.name]), error: errors[col.name], children: _jsx(EuiFieldText, { name: col.name, isInvalid: !!(touched[col.name] && errors[col.name]), compressed: true, value: values[col.name], onChange: handleChange, onBlur: handleBlur }) }) }, col.name));
                        }) })) }));
            } }));
    }
};
NewFormInner = __decorate([
    observer
], NewFormInner);
export { NewFormInner };
//# sourceMappingURL=new-form.js.map