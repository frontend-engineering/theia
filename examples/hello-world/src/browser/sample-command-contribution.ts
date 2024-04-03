import { inject, injectable } from '@theia/core/shared/inversify'
import { CommandContribution, CommandRegistry, MessageService } from '@theia/core'
import { LoginDialog } from './login/login-dialog'
import { GridCellCommand } from './resource/resource-grid-model'
import { NavigatorDiffCommands } from '@theia/navigator/lib/browser/navigator-diff'
import { FileSystemCommands } from '@theia/filesystem/lib/browser/filesystem-frontend-contribution'
import { CommonCommands } from '@theia/core/lib/browser'
import { WorkspaceCommands } from '@theia/workspace/lib/browser'
import { ThemeService } from '@theia/core/lib/browser/theming'

@injectable()
export class SampleCommandContribution implements CommandContribution {
  @inject(MessageService) protected readonly messageService: MessageService
  @inject(LoginDialog) protected readonly loginDialog: LoginDialog
  @inject(ThemeService) protected readonly themeService: ThemeService


  registerCommands(commandRegistry: CommandRegistry): void {
    commandRegistry.registerCommand(
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
    commandRegistry.registerCommand(
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

    commandRegistry.registerCommand(GridCellCommand, {
      execute: (widgetToActOn, address, variable) => {
        this.messageService.info('Open reference')
      },
      isEnabled: () => true,
      isVisible: () => true,
    })

    commandRegistry.unregisterCommand(NavigatorDiffCommands.COMPARE_FIRST.id)
    commandRegistry.unregisterCommand(FileSystemCommands.UPLOAD.id)
    commandRegistry.unregisterCommand(CommonCommands.COPY.id)
    commandRegistry.unregisterCommand(CommonCommands.PASTE.id)
    commandRegistry.unregisterCommand(WorkspaceCommands.ADD_FOLDER.id)
  }
}
