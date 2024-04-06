import { injectable } from '@theia/core/shared/inversify'
import { Command, CommandRegistry } from '@theia/core'

@injectable()
export class SampleCommandRegistry extends CommandRegistry {
  override get commands(): Command[] {

    return Object.values(this._commands).filter(command => [
      'explorer-view-container:toggle-visibility',
      'explorer-view-container:toggle-visibility-explorer-view-container--files-hello',
    ].indexOf(command.id) === -1)
  }
}
