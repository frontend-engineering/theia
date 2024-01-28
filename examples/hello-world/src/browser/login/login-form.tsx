import * as React from 'react'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Formik, FormikProps } from 'formik'
import { EuiFieldText, EuiForm, EuiFormRow, EuiProvider } from '@elastic/eui'
import { TypeOf, z } from 'zod'
import { trpcProxyClient } from '../trpc-client'
import { MessageService } from '@theia/core'

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string().min(4),
})
type LoginFormInputs = TypeOf<typeof loginFormSchema>

export class LoginForm extends React.Component {
  public formikProps: FormikProps<LoginFormInputs>

  override render() {
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
