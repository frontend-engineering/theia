import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar'
import { inject, injectable } from '@theia/core/shared/inversify'
import { CommandRegistry } from '@theia/core'

/*
 有些 command 是在 registerToolbarItems > registerMoreToolbarItem
 时机上比 CommandContribution 晚
 这里额外 bind 一个 TabBarToolbarContribution 实现，将相关 commands unregister
 */
@injectable()
export class SampleTabBarToolbarContribution implements TabBarToolbarContribution {
  @inject(CommandRegistry) protected commandRegistry: CommandRegistry

  registerToolbarItems(registry: TabBarToolbarRegistry): void {
    const unregisterCommands = [
      'file.openWith.http',
      'file.openWith.command',
      'file.openWith.code-editor-opener',
      'file.openWith.preference',
      'file.openWith.mini-browser',
      'file.openWith.code-editor-preview',
      'file.openWith.resource-editor-opener',

      'navigator.tabbar.toolbar.workspace:addFolder',
      'navigator.tabbar.toolbar.navigator.toggle.autoReveal',
    ]
    unregisterCommands.forEach(id => {
      registry.unregisterItem(id)
      this.commandRegistry.unregisterCommand(id)
    })
  }
}
