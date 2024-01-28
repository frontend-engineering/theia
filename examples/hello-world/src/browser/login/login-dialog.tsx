import * as React from 'react'
import { inject, injectable } from 'inversify'
import { ReactDialog } from '@theia/core/lib/browser/dialogs/react-dialog'
import { ABOUT_CONTENT_CLASS, AboutDialogProps } from '@theia/core/lib/browser/about-dialog'
import { Message } from '@theia/core/lib/browser/widgets/widget'
import { MessageService } from '@theia/core'
import { Dialog } from '@theia/core/lib/browser/dialogs'
import { LoginForm } from './login-form'
import { trpcProxyClient } from '../trpc-client'

function delay(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

@injectable()
export class LoginDialog extends ReactDialog<void> {
  loginFormRef: LoginForm

  constructor(
    @inject(AboutDialogProps) protected override readonly props: AboutDialogProps,
    @inject(MessageService) protected readonly messageService: MessageService,
  ) {
    super({
      title: 'Login',
    })
    this.appendAcceptButton(Dialog.OK)
  }

  protected render(): React.ReactNode {
    const access_token = localStorage.getItem('access_token')
    return <div className={ABOUT_CONTENT_CLASS}>
      <LoginForm ref={ref => this.loginFormRef = ref!}/>
    </div>
  }

  protected override onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg)
    this.update()
  }

  get value(): undefined { return undefined }

  protected override async accept() {
    this.loginFormRef.formikProps.setSubmitting(true)
    try {
      const res = await trpcProxyClient.user.validate.query(this.loginFormRef.formikProps.values)
      localStorage.setItem('access_token', res.access_token)
      await super.accept()
      void this.messageService.info('Login succeed!', {
        timeout: 3000,
      })
    } catch (e) {
      console.error('[LoginDialog accept]', e)
    }
    this.loginFormRef.formikProps.setSubmitting(false)
  }
}
