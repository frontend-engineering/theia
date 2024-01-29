import * as React from 'react'
import { inject, injectable } from 'inversify'
import { ReactDialog } from '@theia/core/lib/browser/dialogs/react-dialog'
import { ABOUT_CONTENT_CLASS, AboutDialogProps } from '@theia/core/lib/browser/about-dialog'
import { Message } from '@theia/core/lib/browser/widgets/widget'
import { ILogger, MessageService } from '@theia/core'
import { Dialog } from '@theia/core/lib/browser/dialogs'
import { LoginForm } from './login-form'
import { LoginModel } from './login.model'

function delay(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

@injectable()
export class LoginDialog extends ReactDialog<void> {
  constructor(
    @inject(AboutDialogProps) protected override readonly props: AboutDialogProps,
    @inject(MessageService) protected readonly messageService: MessageService,
    @inject(LoginModel) protected readonly login: LoginModel,
    @inject(ILogger) protected logger: ILogger,
  ) {
    super({
      title: 'Login',
    })
    this.appendAcceptButton(Dialog.OK)
  }

  protected render(): React.ReactNode {
    return <div className={ABOUT_CONTENT_CLASS}>
      <LoginForm model={this.login}/>
    </div>
  }

  protected override async onAfterAttach(msg: Message) {
    super.onAfterAttach(msg)
    this.login.checkLogin()
    this.update()
  }

  get value(): undefined { return undefined }

  protected override async accept() {
    if (this.login.isLogin) {
      await super.accept()
    } else {
      await this.login.login(super.accept.bind(this))
    }
  }
}
