import { observer } from 'mobx-react'
import * as React from 'react'
import { ResourceModel } from './resource.model'
import { AgGridReact } from 'ag-grid-react'

@observer
export class Resource extends React.Component<{
  model: ResourceModel
}> {
  override render() {
    return (
      // todo: 使用 theia 的 parent className 修改主题直接切换 ag grid theme css var
      <div className="ag-theme-linear-dark" style={{ height: '100%' }}>
        <AgGridReact rowData={this.props.model.data} columnDefs={this.props.model.columnDefs}/>
      </div>
    )
  }
}
