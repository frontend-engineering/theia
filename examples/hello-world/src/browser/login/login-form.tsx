import * as React from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Formik, FormikProps } from 'formik'
import { EuiFieldText, EuiForm, EuiFormRow, EuiProvider } from '@elastic/eui'
import { observer } from 'mobx-react'
import { LoginFormInputs, loginFormSchema, LoginModel } from './login.model'

@observer
export class LoginForm extends React.Component<{
  model: LoginModel
}> {
  override componentDidMount() {
    this.props.model.checkLogin()
  }

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
              <EuiProvider colorMode="dark" utilityClasses={false}>
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
              </EuiProvider>
            )
          }}
        </Formik>
      )
    }

  }
}
