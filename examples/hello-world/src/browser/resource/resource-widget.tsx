import { ReactWidget } from '@theia/core/lib/browser'
import * as React from '@theia/core/shared/react'
import { Grid, GridModel } from '@flowda/design'

export class ResourceWidget extends ReactWidget {
  static readonly ID = 'resource-widget'

  constructor(private option: { id: string; title: string, model: GridModel }) {
    super()
    this.id = option.id
    this.title.caption = option.title
    this.title.label = option.title
    this.title.iconClass = 'unclosable-window-icon'
    this.title.closable = true
    this.update()
  }

  protected render(): React.ReactNode {
    return <Grid model={this.option.model}/>
  }
}
