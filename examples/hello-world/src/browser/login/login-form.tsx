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
  public formikProps: FormikProps<LoginFormInputs>

  override componentDidMount() {
    const access_token = localStorage.getItem('access_token')
    if (access_token != null) {
      this.props.model.setIsLogin()
    }
  }

  override render() {
    if (this.props.model.isLogin) {
      return (
        <div>logged as test</div>
      )
    } else {
      return (
        <Formik<LoginFormInputs> onSubmit={() => {}} initialValues={{
          username: '',
          password: '',
        }} validationSchema={toFormikValidationSchema(loginFormSchema)}
        >
          {(formikProps: FormikProps<LoginFormInputs>) => {
            this.formikProps = formikProps
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
