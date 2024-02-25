import { FrontendApplicationContribution } from '@theia/core/lib/browser'
import { inject, injectable } from '@theia/core/shared/inversify'
import { LoginModelSymbol } from '@flowda-projects/flowda-shared-types'
import { LoginModel } from '@flowda-projects/flowda-theia-design'
import { MessageService } from '@theia/core'

@injectable()
export class HelloFrontendContribution implements FrontendApplicationContribution {
  @inject(LoginModelSymbol) protected login: LoginModel
  @inject(MessageService) protected messageService: MessageService

  initialize(): void {
    this.login.handlers.info = this.messageService.info.bind(this.messageService)
  }
}
