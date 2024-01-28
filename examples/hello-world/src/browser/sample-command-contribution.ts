import { inject, injectable } from '@theia/core/shared/inversify'
import { CommandContribution, CommandRegistry, MessageService } from '@theia/core'
import { LoginDialog } from './login/login-dialog'

@injectable()
export class SampleCommandContribution implements CommandContribution {
  @inject(MessageService) protected readonly messageService: MessageService
  @inject(LoginDialog) protected readonly loginDialog: LoginDialog

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(
      {
        id: 'command.examples.say-hi',
        category: 'Examples',
        label: 'Say Hi',
      },
      {
        execute: () => {
          this.messageService.info('Hello world!')
        },
      },
    )
    registry.registerCommand(
      {
        id: 'command.hello.login',
        category: 'Examples',
        label: 'Login',
      },
      {
        execute: () => {
          this.loginDialog.open()
        },
      },
    )
  }
}
