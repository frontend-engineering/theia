import { GridModel } from '@flowda/design'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ContextMenuRenderer, HoverService, OpenerService } from '@theia/core/lib/browser'
import { Command, CommandRegistry, URI } from '@theia/core'
import * as React from '@theia/core/shared/react'
import { CreateTRPCProxyClient } from '@trpc/client'
import { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { handleContextMenuInputSchema } from '@flowda/types'
import { z } from 'zod'

export namespace ResourceGridCommands {
  export const CONTEXT_MENU = ['resource-grid.context.menu']

  export const OPEN_REFERENCE: Command = {
    id: 'resource-grid.open-reference',
    category: 'Examples',
    label: 'Open reference',
  }

  export const EDIT_MENU: Command = {
    id: 'resource-grid.edit-menu',
    category: 'Examples',
    label: 'Edit Menu',
  }

  export const OPEN_ASSOCIATION: Command = {
    id: 'resource-grid.open-association',
    category: 'Examples',
    label: 'Open association',
  }

  export const OPEN_TASK: Command = {
    id: 'resource-grid.open-task',
    category: 'Examples',
    label: 'Open task',
  }

  export const NEW_FORM: Command = {
    id: 'resource-grid.new-form',
    category: 'Examples',
    label: 'New form',
  }
}

@injectable()
export class ResourceGridModel extends GridModel {
  @inject(OpenerService) openerService: OpenerService
  @inject(HoverService) hoverService: HoverService
  @inject(ContextMenuRenderer) protected readonly contextMenuRenderer: ContextMenuRenderer
  @inject('trpcFactory') protected trpcFactory: () => CreateTRPCProxyClient<AppRouter>
  @inject(CommandRegistry) protected readonly commandRegistry: CommandRegistry

  @postConstruct()
  postConstruct() {
    // this.handlers.onRefClick = this.handleOnRefClick
    // this.handlers.onMouseEnter = this.handleMouseEnter
    this.handlers.onContextMenu = this.handleContextMenu.bind(this)
    this.handlers.onClickNew = (uri: URI) => this.commandRegistry.executeCommand(ResourceGridCommands.NEW_FORM.id, {
      uri,
    })
  }

  /*
  todo 实现 reference preview 未完全实现
   */
  /* private readonly handleMouseEnter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // todo: 判断是否按照 command
    this.hoverService.requestHover({
      content: document.createElement('reference-preview'),
      target: e.currentTarget,
      position: 'right',
    })
  }*/

  private handleContextMenu = (input: z.infer<typeof handleContextMenuInputSchema>, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    const { clientX, clientY } = e
    this.contextMenuRenderer.render({
      menuPath: ResourceGridCommands.CONTEXT_MENU,
      anchor: { x: clientX, y: clientY },
      args: [
        input,
        this,
      ],
    })
  }
}
