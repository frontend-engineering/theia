import { ReactWidget } from '@theia/core/lib/browser'
import * as React from '@theia/core/shared/react'

export class ResourceWidget extends ReactWidget {
  static readonly ID = 'resource-widget'

  constructor(option: { id: string; title: string }) {
    super()
    this.id = option.id
    this.title.caption = option.title
    this.title.label = option.title
    this.title.iconClass = 'unclosable-window-icon'
    this.title.closable = true
    this.update()
  }

  protected render(): React.ReactNode {
    return (
      <div>
        <div>
          Closable
          <input type="checkbox" defaultChecked={this.title.closable}
                 onChange={e => this.title.closable = e.target.checked}/>
        </div>
        <div>
          Resource
        </div>
      </div>
    )
  }
}
