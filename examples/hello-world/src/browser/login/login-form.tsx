import * as React from '@theia/core/shared/react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Formik, FormikProps } from 'formik'
import { EuiFieldText, EuiForm, EuiFormRow, EuiThemeProvider } from '@elastic/eui'
import { observer } from 'mobx-react'
import { LoginFormInputs, loginFormSchema, LoginModel } from './login.model'

@observer
export class LoginForm extends React.Component<{
  model: LoginModel
}> {

  override render() {
    if (this.props.model.isLogin) {
      return (
        <div>Already logged in! <a onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          this.props.model.logout()
        }}>Logout</a></div>
      )
    } else {
      return (
        <Formik<LoginFormInputs> onSubmit={() => {}} initialValues={{
          username: '',
          password: '',
        }} validationSchema={toFormikValidationSchema(loginFormSchema)}
        >
          {(formikProps: FormikProps<LoginFormInputs>) => {
            this.props.model.formikProps = formikProps
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            } = formikProps
            return (
              <EuiThemeProvider colorMode="dark">
                <EuiForm isInvalid={false} error={[]} component="form">
                  <EuiFormRow label="Username" isInvalid={false}>
                    <EuiFieldText name="username" isInvalid={false} compressed={true} value={values.username}
                                  onChange={handleChange}
                                  onBlur={handleBlur}/>
                  </EuiFormRow>
                  <EuiFormRow label="Password" isInvalid={false}>
                    <EuiFieldText name="password" type="password" isInvalid={false} compressed={true}
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}/>
                  </EuiFormRow>
                </EuiForm>
              </EuiThemeProvider>
            )
          }}
        </Formik>
      )
    }

  }
}
