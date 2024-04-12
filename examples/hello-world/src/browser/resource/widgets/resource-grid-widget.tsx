import { ReactWidget } from '@theia/core/lib/browser'
import * as React from '@theia/core/shared/react'
import { Grid, GridModel, uriWithoutId } from '@flowda/design'
import { ResourceWidgetFactory } from '../resource-widget-factory'

export class ResourceGridWidget extends ReactWidget {
  static readonly ID = 'grid-widget'

  constructor(private option: { id: string; uri: string, title: string, model: GridModel }) {
    super()
    this.id = option.id
    this.title.caption = option.title
    this.title.label = option.title
    this.title.iconClass = 'unclosable-window-icon'
    this.title.closable = true
    this.update()
  }

  protected render(): React.ReactNode {
    const uri = uriWithoutId(this.id.replace(`${ResourceWidgetFactory.ID}:`, ''))
    return <Grid
      ref={ref => this.option.model.setRef(ref, uri)}
      model={this.option.model} uri={uri}/>
  }
}
