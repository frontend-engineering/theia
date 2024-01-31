import { ReactWidget } from '@theia/core/lib/browser'
import * as React from '@theia/core/shared/react'
import { Resource } from './resource'
import { ResourceModel } from './resource.model'

export class ResourceWidget extends ReactWidget {
  static readonly ID = 'resource-widget'

  constructor(private option: { id: string; title: string, model: ResourceModel }) {
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
        <Resource model={this.option.model}/>
      </div>
    )
  }
}
