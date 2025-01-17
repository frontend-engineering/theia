import { inject, injectable } from '@theia/core/shared/inversify'
import { CommandContribution, CommandRegistry, MessageService, URI } from '@theia/core'
import { LoginDialog } from './login/login-dialog'
import { ResourceGridCommands, type ResourceGridModel } from './resource/resource-grid-model'
import { NavigatorDiffCommands } from '@theia/navigator/lib/browser/navigator-diff'
import { OpenEditorsCommands } from '@theia/navigator/lib/browser/open-editors-widget/navigator-open-editors-commands'
import { FileSystemCommands } from '@theia/filesystem/lib/browser/filesystem-frontend-contribution'
import { FileDownloadCommands } from '@theia/filesystem/lib/browser/download/file-download-command-contribution'
import { CommonCommands, KeyboardCommands, open, OpenerService } from '@theia/core/lib/browser'
import { WorkspaceCommands } from '@theia/workspace/lib/browser'
import { ThemeService } from '@theia/core/lib/browser/theming'
import { WindowCommands } from '@theia/core/lib/browser/window-contribution'
import { FileNavigatorCommands } from '@theia/navigator/lib/browser/file-navigator-commands'
import { KeymapsCommands } from '@theia/keymaps/lib/browser'
import { PreferencesCommands } from '@theia/preferences/lib/browser/util/preference-types'
import { MiniBrowserCommands } from '@theia/mini-browser/lib/browser/mini-browser-open-handler'
import { LIST_VARIABLES } from '@theia/variable-resolver/lib/browser/variable-resolver-frontend-contribution'
import { EditorCommands } from '@theia/editor/lib/browser'
import { PreviewCommands } from '@theia/preview/lib/browser/preview-contribution'
import { z } from 'zod'
import { handleContextMenuInputSchema } from '@flowda/types'
import { createAssociationUri, createRefUri, createTaskUri, createTreeGridUri } from '@flowda/design'
import { ResourceWidgetFactory } from './resource/resource-widget-factory'

@injectable()
export class SampleCommandContribution implements CommandContribution {
  @inject(MessageService) protected readonly messageService: MessageService
  @inject(LoginDialog) protected readonly loginDialog: LoginDialog
  @inject(ThemeService) protected readonly themeService: ThemeService
  @inject(OpenerService) protected readonly openerService: OpenerService
  @inject(ResourceWidgetFactory) protected resourceWidgetFactory: ResourceWidgetFactory

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

    commandRegistry.registerCommand(ResourceGridCommands.OPEN_REFERENCE, {
      execute: (input: z.infer<typeof handleContextMenuInputSchema>, resourceGridModel: ResourceGridModel, __) => {
        const uri = createRefUri(input)
        const model = this.resourceWidgetFactory.getOrCreateGridModel(uri)
        model.setUri(uri)
        open(this.openerService, uri, {
          mode: 'reveal',
          preview: true,
        })
      },
      isEnabled: (...args) => {
        const input = (args[0] as z.infer<typeof handleContextMenuInputSchema> | null)
        return input?.column?.column_type === 'reference'
      },
      isVisible: (...args) => {
        const input = (args[0] as z.infer<typeof handleContextMenuInputSchema> | null)
        return input?.column?.column_type === 'reference'
      },
    })
    commandRegistry.registerCommand(ResourceGridCommands.OPEN_ASSOCIATION, {
      execute: (input: z.infer<typeof handleContextMenuInputSchema>, resourceGridModel: ResourceGridModel, __) => {
        const uri = createAssociationUri(input)
        const model = this.resourceWidgetFactory.getOrCreateGridModel(uri)
        model.setUri(uri)
        open(this.openerService, uri, {
          mode: 'reveal',
          preview: true,
        })
      },
      isEnabled: (...args) => {
        const input = (args[0] as z.infer<typeof handleContextMenuInputSchema> | null)
        const ret = input?.association?.model_name != null
        return ret
      },
      isVisible: (...args) => {
        const input = (args[0] as z.infer<typeof handleContextMenuInputSchema> | null)
        return input?.association?.model_name != null
      },
    })
    commandRegistry.registerCommand(ResourceGridCommands.OPEN_TASK, {
      execute: (input: z.infer<typeof handleContextMenuInputSchema>, resourceGridModel: ResourceGridModel, __) => {
        const uri = createTaskUri(input)
        const model = this.resourceWidgetFactory.getOrCreateGridModel(uri)
        open(this.openerService, uri, {
          mode: 'reveal',
          preview: true,
        })
      },
      isEnabled: (...args) => true,
      isVisible: (...args) => true,
    })
    commandRegistry.registerCommand(ResourceGridCommands.NEW_FORM, {
      execute: (input: { uri: URI }) => {
        const model = this.resourceWidgetFactory.getOrCreateGridModel(input.uri)
        open(this.openerService, input.uri, {
          mode: 'reveal',
          preview: true,
        })
      },
      isEnabled: (...args) => true,
      isVisible: (...args) => true,
    })
    commandRegistry.registerCommand(ResourceGridCommands.EDIT_MENU, {
      execute: (input: z.infer<typeof handleContextMenuInputSchema>, resourceGridModel: ResourceGridModel, __) => {
        const uri = createTreeGridUri(input.uri,
          // @ts-expect-error
          input.cellRendererInput.data?.id,
          input.cellRendererInput.colDef.field)
        open(this.openerService, uri, {
          mode: 'reveal',
          preview: true,
        })
      },
      isEnabled: (...args) => {
        const input = (args[0] as z.infer<typeof handleContextMenuInputSchema> | null)
        const ret = input?.column?.column_type === 'Json'
        // console.log(`edit menu`, ret)
        return ret
      },
      isVisible: (...args) => {
        const input = (args[0] as z.infer<typeof handleContextMenuInputSchema> | null)
        return input?.column?.column_type === 'Json'
      },
    })
    /*
    目前 theia packages 互相依赖，特别是 monaco 是强依赖
    过滤依赖可以在 FilterContribution 整体过滤
    或者通过 commands/menu unregister 细粒度过滤
    前者的优势是干净彻底，但是可能有些是依赖，即通过 extends 复用
    后者劣势是繁琐，一般是不能通过 FilterContribution 才进行微调
     */
    const unregisterCommands = [
      LIST_VARIABLES.id,

      ...Object.values(OpenEditorsCommands).map(command => command.id),
      ...Object.values(PreviewCommands).map(command => command.id),
      ...Object.values(FileDownloadCommands).map(command => command.id),
      ...Object.values(EditorCommands).map(command => command.id),
      ...Object.values(NavigatorDiffCommands).map(command => command.id),
      ...Object.values(FileSystemCommands).map(command => command.id),
      ...Object.values(FileNavigatorCommands).map(command => command.id),
      ...Object.values(WindowCommands).map(command => command.id),
      ...Object.values(KeyboardCommands).map(command => command.id),

      ...Object.values(WorkspaceCommands).reduce<string[]>((acc, cur) => {
        if ('id' in cur && typeof cur.id === 'string') {
          acc.push(cur.id)
        }
        return acc
      }, []),

      ...Object.values(MiniBrowserCommands).reduce<string[]>((acc, cur) => {
        if (typeof cur !== 'string') {
          acc.push(cur.id)
        }
        return acc
      }, []),

      ...Object.values(KeymapsCommands)
        // .filter(command => command.id !== KeymapsCommands.OPEN_KEYMAPS.id)
        .map(command => command.id),
      ...Object.values(PreferencesCommands)
        // .filter(command => [PreferencesCommands.OPEN_WORKSPACE_PREFERENCES.id].indexOf(command.id) === -1)
        .map(command => command.id),

      ...Object.values(CommonCommands).reduce<string[]>((acc, cur) => {
        if (typeof cur === 'string') return acc

        if ([
          CommonCommands.SELECT_COLOR_THEME.id,
          // CommonCommands.OPEN_PREFERENCES.id,
          CommonCommands.ABOUT_COMMAND.id,

          CommonCommands.NEXT_TAB.id,
          CommonCommands.PREVIOUS_TAB.id,
          CommonCommands.CLOSE_TAB.id,
          CommonCommands.CLOSE_OTHER_TABS.id,
          CommonCommands.CLOSE_RIGHT_TABS.id,
          CommonCommands.CLOSE_ALL_TABS.id,
          CommonCommands.CLOSE_MAIN_TAB.id,
          CommonCommands.COLLAPSE_PANEL.id,
          CommonCommands.COLLAPSE_ALL_PANELS.id,
          CommonCommands.TOGGLE_BOTTOM_PANEL.id,
          CommonCommands.TOGGLE_STATUS_BAR.id,
          CommonCommands.PIN_TAB.id,
          CommonCommands.UNPIN_TAB.id,
          CommonCommands.TOGGLE_MAXIMIZED.id,
          CommonCommands.CONFIGURE_DISPLAY_LANGUAGE.id,
        ].indexOf(cur.id) > -1) return acc

        acc.push(cur.id)
        return acc
      }, []),
      ...['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth'].map(ordinal => `workbench.action.focus${ordinal}EditorGroup`),
      ...['noAccounts'],
    ]
    unregisterCommands.forEach(id => commandRegistry.unregisterCommand(id))
  }
}
