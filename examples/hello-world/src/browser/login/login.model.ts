import { injectable } from '@theia/core/shared/inversify'
import { action, makeObservable, observable } from 'mobx'
import { TrpcProxyClient } from '../trpc/trpc-client'
import { TypeOf, z } from 'zod'
import { FormikProps } from 'formik'
import { inject } from 'inversify'
import { MessageService } from '@theia/core'

export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string().min(4),
})
export type LoginFormInputs = TypeOf<typeof loginFormSchema>

@injectable()
export class LoginModel {
  public formikProps: FormikProps<LoginFormInputs>

  @observable isLogin = false

  constructor(
    @inject(MessageService) protected readonly messageService: MessageService,
    @inject(TrpcProxyClient) protected readonly trpcProxyClient: TrpcProxyClient,
  ) {
    makeObservable(this)
  }

  @action.bound
  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin
  }

  checkLogin() {
    const access_token = localStorage.getItem('access_token')
    this.setIsLogin(access_token != null)
  }

  async login(accept: () => Promise<void>) {
    this.formikProps.setSubmitting(true)
    try {
      const res = await this.trpcProxyClient.client.user.validate.query(this.formikProps.values)
      localStorage.setItem('access_token', res.access_token)
      this.setIsLogin(true)
      await accept()
      void this.messageService.info('Login succeed!', {
        timeout: 3000,
      })
    } catch (e) {
      console.error('[LoginDialog accept]', e)
    }
    this.formikProps.setSubmitting(false)
  }

  logout() {
    localStorage.removeItem('access_token')
    this.setIsLogin(false)
  }
}
