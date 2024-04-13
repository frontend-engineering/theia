import * as React from '@theia/core/shared/react'
import { Grid, GridModel } from '@flowda/design'
import { ManageableWidget } from './manageable-widget'

export class ResourceGridWidget extends ManageableWidget {
  static readonly ID = 'grid-widget'

  constructor(private option: { id: string; uri: string, title: string, model: GridModel }) {
    super()
    this.id = option.id
    this.uri = option.uri
    this.title.caption = option.title
    this.title.label = option.title
    this.title.iconClass = 'unclosable-window-icon'
    this.title.closable = true
    this.update()
  }

  protected render(): React.ReactNode {
    return <Grid
      ref={ref => this.option.model.setRef(ref, this.uri)}
      model={this.option.model} uri={this.uri}/>
  }
}
