import { inject, injectable } from '@theia/core/shared/inversify'
import { CommandContribution, CommandRegistry, MessageService } from '@theia/core'

@injectable()
export class SampleCommandContribution implements CommandContribution {
    @inject(MessageService) protected readonly messageService: MessageService

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
    }
}
