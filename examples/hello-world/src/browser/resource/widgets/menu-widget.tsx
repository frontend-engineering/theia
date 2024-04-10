import { ReactWidget } from '@theia/core/lib/browser'
import * as React from '@theia/core/shared/react'
import { TreeGrid, type TreeGridModel } from '@flowda/design'

export class MenuWidget extends ReactWidget {
  static readonly ID = 'menu-widget'
  uri: string

  constructor(private option: { id: string; uri: string, title: string, model: TreeGridModel }) {
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
    return <TreeGrid model={this.option.model}/>
  }
}
