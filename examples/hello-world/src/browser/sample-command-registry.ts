import { injectable } from '@theia/core/shared/inversify'
import { Command, CommandRegistry } from '@theia/core'

/*
某些 commands 不想在 shortcut settings 里出现，但是不能通过 unregister 的方式
 */
@injectable()
export class SampleCommandRegistry extends CommandRegistry {
  override get commands(): Command[] {
    return Object.values(this._commands).filter(command => [
      'explorer-view-container:toggle-visibility',
      'explorer-view-container:toggle-visibility-explorer-view-container--files-hello',
    ].indexOf(command.id) === -1)
  }
}
