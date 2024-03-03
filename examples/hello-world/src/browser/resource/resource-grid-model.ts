import { GridModel } from '@flowda-projects/flowda-theia-design'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { HoverService, open, OpenerService } from '@theia/core/lib/browser'
import { URI } from '@theia/core'

@injectable()
export class ResourceGridModel extends GridModel {
  @inject(OpenerService) openerService: OpenerService
  @inject(HoverService) hoverService: HoverService

  @postConstruct()
  postConstruct() {
    this.handlers.onRefClick = this.handleOnRefClick.bind(this)
    this.handlers.onMouseEnter = this.handleMouseEnter.bind(this)
  }

  handleMouseEnter(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.hoverService.requestHover({
      content: 'hello',
      target: e.currentTarget,
      position: 'top',
    })
  }

  handleOnRefClick(v: {
    schemaName: string;
    name: string;
    id: number;
  }) {
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
