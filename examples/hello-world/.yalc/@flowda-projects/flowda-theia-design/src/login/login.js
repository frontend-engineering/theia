import { __decorate } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Formik } from 'formik';
import { EuiFieldText, EuiForm, EuiFormRow, EuiThemeProvider } from '@elastic/eui';
import { observer } from 'mobx-react';
import { loginFormSchema } from './login.model';
let Login = class Login extends React.Component {
    render() {
        if (this.props.model.isLogin) {
            return (_jsxs("div", { children: ["Already logged in!", ' ', _jsx("a", { onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.props.model.logout();
                        }, children: "Logout" })] }));
        }
        else {
            return (_jsx(Formik, { onSubmit: () => { }, initialValues: {
                    username: '',
                    password: '',
                }, validationSchema: toFormikValidationSchema(loginFormSchema), children: (formikProps) => {
                    this.props.model.formikProps = formikProps;
                    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
                    /* and other goodies */
                     } = formikProps;
                    return (_jsx(EuiThemeProvider, { colorMode: "dark", children: _jsxs(EuiForm, { isInvalid: false, error: [], component: "form", children: [_jsx(EuiFormRow, { label: "Username", isInvalid: false, children: _jsx(EuiFieldText, { name: "username", isInvalid: false, compressed: true, value: values.username, onChange: handleChange, onBlur: handleBlur }) }), _jsx(EuiFormRow, { label: "Password", isInvalid: false, children: _jsx(EuiFieldText, { name: "password", type: "password", isInvalid: false, compressed: true, value: values.password, onChange: handleChange, onBlur: handleBlur }) })] }) }));
                } }));
        }
    }
};
Login = __decorate([
    observer
], Login);
export { Login };
//# sourceMappingURL=login.js.map