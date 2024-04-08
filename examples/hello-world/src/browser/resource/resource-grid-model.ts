import { GridModel } from '@flowda/design'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ContextMenuRenderer, HoverService, open, OpenerService } from '@theia/core/lib/browser'
import { Command, URI } from '@theia/core'
import * as React from '@theia/core/shared/react'
import { CreateTRPCProxyClient } from '@trpc/client'
import { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { z } from 'zod'
import { handleContextMenuInputSchema } from '@flowda/types'

export const GridCellCommand: Command = {
  id: 'resource-grid-cell',
  category: 'Examples',
  label: 'Open reference',
}

@injectable()
export class ResourceGridModel extends GridModel {
  @inject(OpenerService) openerService: OpenerService
  @inject(HoverService) hoverService: HoverService
  @inject(ContextMenuRenderer) protected readonly contextMenuRenderer: ContextMenuRenderer
  @inject('trpcFactory') protected trpcFactory: () => CreateTRPCProxyClient<AppRouter>

  static CONTEXT_MENU = ['resource-grid.context.menu']

  @postConstruct()
  postConstruct() {
    this.handlers.onRefClick = this.handleOnRefClick
    this.handlers.onMouseEnter = this.handleMouseEnter
    this.handlers.onContextMenu = this.handleContextMenu

    this.apis.getResourceData = this.trpcFactory().hello.getResourceData.query
    this.apis.getResourceSchema = this.trpcFactory().hello.getResourceSchema.query
    this.apis.putResourceData = this.trpcFactory().hello.putResourceData.mutate
  }

  /*
  todo 实现 reference preview 未完全实现
   */
  private readonly handleMouseEnter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // todo: 判断是否按照 command
    this.hoverService.requestHover({
      content: document.createElement('reference-preview'),
      target: e.currentTarget,
      position: 'right',
    })
  }

  private handleContextMenu = (cellRendererInput: z.infer<typeof handleContextMenuInputSchema>, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    const { clientX, clientY } = e
    this.contextMenuRenderer.render({
      menuPath: ResourceGridModel.CONTEXT_MENU,
      anchor: { x: clientX, y: clientY },
      args: [
        cellRendererInput,
        this,
      ],
    })
  }

  protected getContextMenuArgs(event: React.MouseEvent): unknown[] {
    const args: unknown[] = [this]
    return args
  }

  private readonly handleOnRefClick = (v: {
    schemaName: string;
    name: string;
    id: number;
  }) => {
    const k = GridModel.KEY
    const resourceQuery = localStorage.getItem(k)
    let prev: Record<string, unknown> = {}
    // eslint-disable-next-line no-null/no-null
    if (resourceQuery != null) {
      try {
        prev = JSON.parse(resourceQuery)
      } catch (e) {
        prev = {}
      }
    }
    prev[v.schemaName] = {
      _ref: '1',
      id: { filterType: 'number', type: 'equals', filter: v.id },
    }
    localStorage.setItem(k, JSON.stringify(prev))

    open(this.openerService, {
      scheme: v.schemaName,
      name: v.name,
    } as unknown as URI, {
      mode: 'reveal',
      preview: true,
    })
  }

}
