import { __decorate } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { Formik } from 'formik';
import { EuiFlexGroup, EuiFlexItem, EuiFieldText, EuiForm, EuiFormRow, EuiThemeProvider } from '@elastic/eui';
import { observer } from 'mobx-react';
let TaskForm = class TaskForm extends Component {
    render() {
        return (_jsx(Formik, { onSubmit: values => {
                this.props.model.submit(values);
            }, initialValues: this.props.model.defaultInitialValues, children: (formikProps) => {
                this.props.model.formikProps = formikProps;
                const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
                /* and other goodies */
                 } = formikProps;
                const cols = this.props.model.columns;
                return (_jsx(EuiThemeProvider, { colorMode: this.props.model.theme.colorMode, children: _jsxs(EuiForm, { isInvalid: false, error: [], component: "form", children: [_jsx(EuiFlexGroup, { style: { maxWidth: 600 }, children: cols.map(col => {
                                    return (_jsx(EuiFlexItem, { children: _jsx(EuiFormRow, { label: col.display_name, isInvalid: !!(touched[col.name] && errors[col.name]), error: errors[col.name], children: _jsx(EuiFieldText, { readOnly: col.access_type === 'read_only' ? true : false, name: col.name, isInvalid: !!(touched[col.name] && errors[col.name]), compressed: true, value: values[col.name] == null ? undefined : values[col.name], onChange: handleChange, onBlur: handleBlur }) }) }, col.name));
                                }) }), _jsx("button", { type: "submit", onClick: e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleSubmit();
                                }, children: "Save form" })] }) }));
            } }));
    }
};
TaskForm = __decorate([
    observer
], TaskForm);
export { TaskForm };
//# sourceMappingURL=task-form.js.map