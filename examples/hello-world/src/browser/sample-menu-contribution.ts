import { injectable } from '@theia/core/shared/inversify'
import { MANAGE_MENU, MenuContribution, MenuModelRegistry } from '@theia/core'
import { ResourceGridCommands } from './resource/resource-grid-model'
import { nls } from '@theia/core/lib/common/nls'
import { CommonCommands } from '@theia/core/lib/browser'
import { KeymapsCommands } from '@theia/keymaps/lib/browser'
import { CommonMenus } from '@theia/core/lib/browser/common-frontend-contribution'
import { GettingStartedCommand } from '@theia/getting-started/lib/browser/getting-started-contribution'

const MANAGE_SETTINGS_SUBMENU = [...MANAGE_MENU, '1_settings_submenu']
const MANAGE_SETTINGS_SUBMENU_OPEN = [...MANAGE_SETTINGS_SUBMENU, '1_settings_submenu_open']

const MANAGE_HELP_SUBMENU = [...MANAGE_MENU, '2_help_submenu']

@injectable()
export class SampleMenuContribution implements MenuContribution {
  registerMenus(registry: MenuModelRegistry): void {
    /* unregister menubar */
    registry.unregisterMenuNode('1_file')
    registry.unregisterMenuNode('2_edit')
    registry.unregisterMenuNode('3_selection')
    registry.unregisterMenuNode('4_view')
    registry.unregisterMenuNode('5_go')
    registry.unregisterMenuNode('6_debug')
    registry.unregisterMenuNode('7_terminal')
    registry.unregisterMenuNode('9_help')
    /* END unregister menubar */

    /* unregister manage menu & add */
    registry.unregisterMenuAction(KeymapsCommands.OPEN_KEYMAPS.id, CommonMenus.MANAGE_SETTINGS)
    registry.unregisterMenuAction(CommonCommands.OPEN_PREFERENCES.id, CommonMenus.MANAGE_SETTINGS)
    registry.unregisterMenuAction(CommonCommands.SELECT_COLOR_THEME.id, CommonMenus.MANAGE_SETTINGS_THEMES)
    registry.unregisterMenuAction(CommonCommands.SELECT_ICON_THEME.id, CommonMenus.MANAGE_SETTINGS_THEMES)

    // 由于目前 shortcut 和 preferences 先禁用，将 color theme 放到外面
    registry.registerMenuAction(MANAGE_MENU, {
      commandId: CommonCommands.SELECT_COLOR_THEME.id,
    })

    // 禁用 shortcut 和 preferences
    // registry.registerSubmenu(MANAGE_SETTINGS_SUBMENU, nls.localizeByDefault(CommonCommands.PREFERENCES_CATEGORY))
    // registry.registerMenuAction(MANAGE_SETTINGS_SUBMENU, {
    //   commandId: CommonCommands.OPEN_PREFERENCES.id,
    //   label: nls.localizeByDefault('Settings'),
    // })
    // registry.registerMenuAction(MANAGE_SETTINGS_SUBMENU_OPEN, {
    //   commandId: KeymapsCommands.OPEN_KEYMAPS.id,
    //   label: nls.localizeByDefault('Keyboard Shortcuts'),
    // })
    // registry.registerMenuAction(MANAGE_SETTINGS_SUBMENU_OPEN, {
    //   commandId: CommonCommands.SELECT_COLOR_THEME.id,
    // })

    registry.registerSubmenu(MANAGE_HELP_SUBMENU, nls.localizeByDefault('Help'))
    registry.registerMenuAction(MANAGE_HELP_SUBMENU, {
      commandId: CommonCommands.ABOUT_COMMAND.id,
    })
    registry.registerMenuAction(MANAGE_HELP_SUBMENU, {
      commandId: GettingStartedCommand.id,
    })

    /* END unregister manage menu & add */

    /* ag-grid */
    registry.registerMenuAction(
      ResourceGridCommands.CONTEXT_MENU,
      { commandId: ResourceGridCommands.OPEN_REFERENCE.id, label: ResourceGridCommands.OPEN_REFERENCE.label },
    )
    registry.registerMenuAction(
      ResourceGridCommands.CONTEXT_MENU,
      { commandId: ResourceGridCommands.EDIT_MENU.id, label: ResourceGridCommands.EDIT_MENU.label },
    )
    /* END ag-grid */
  }
}
