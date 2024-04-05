import { FrontendApplicationContribution } from '@theia/core/lib/browser'
import { inject, injectable } from '@theia/core/shared/inversify'
import { LoginModelSymbol } from '@flowda/types'
import { LoginModel } from '@flowda/design'
import { MessageService } from '@theia/core'
import { CreateTRPCProxyClient } from '@trpc/client'
import { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { ThemeService } from '@theia/core/lib/browser/theming'

@injectable()
export class HelloFrontendContribution implements FrontendApplicationContribution {
  @inject(LoginModelSymbol) protected login: LoginModel
  @inject(MessageService) protected messageService: MessageService
  @inject(ThemeService) protected themeService: ThemeService
  @inject('trpcFactory') protected trpcFactory: () => CreateTRPCProxyClient<AppRouter>

  initialize(): void {
    this.login.handlers.info = this.messageService.info.bind(this.messageService)
    this.login.handlers.validate = this.trpcFactory().hello.validate.mutate

    document.body.classList.add('flowda')

    if (this.themeService.getCurrentTheme().type === 'light' || this.themeService.getCurrentTheme().type === 'hcLight') {
      document.body.classList.add('ag-theme-quartz')
    } else {
      document.body.classList.add('ag-theme-quartz-dark')
    }

    this.themeService.onDidColorThemeChange((evt) => {
      if (evt?.oldTheme?.type) {
        if (evt.oldTheme.type === 'light' || evt.oldTheme.type === 'hcLight') {
          document.body.classList.remove('ag-theme-quartz')
        } else {
          document.body.classList.remove('ag-theme-quartz-dark')
        }
      }

      if (evt.newTheme.type === 'light' || evt.newTheme.type === 'hcLight') {
        document.body.classList.add('ag-theme-quartz')
      } else {
        document.body.classList.add('ag-theme-quartz-dark')
      }
    })
  }
}
