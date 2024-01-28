import { ReactWidget } from '@theia/core/lib/browser'
import * as React from '@theia/core/shared/react'
import { useState } from '@theia/core/shared/react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const GridExample = () => {
  const [rowData, setRowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ])

  const [colDefs, setColDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ])

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 500 }}>
      <AgGridReact rowData={rowData} columnDefs={colDefs as any}/>
    </div>
  )

}

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
        <GridExample/>
      </div>
    )
  }
}
