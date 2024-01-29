import { injectable } from '@theia/core/shared/inversify'
import { action, makeObservable, observable } from 'mobx'
import { trpcProxyClient } from '../trpc-client'
import { TypeOf, z } from 'zod'

export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string().min(4),
})
export type LoginFormInputs = TypeOf<typeof loginFormSchema>

@injectable()
export class LoginModel {
  @observable isLogin = false

  constructor() {
    makeObservable(this)
  }

  @action.bound
  setIsLogin() {
    this.isLogin = true
  }

  async login(values: LoginFormInputs) {
    const res = await trpcProxyClient.user.validate.query(values)
    localStorage.setItem('access_token', res.access_token)
  }
}
