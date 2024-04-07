import { __awaiter, __decorate } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from 'react';
import { observer } from 'mobx-react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
let TreeGrid = class TreeGrid extends Component {
    constructor() {
        super(...arguments);
        this.gridRef = null;
        this.onCellValueChanged = (evt) => __awaiter(this, void 0, void 0, function* () {
            console.log(`[Grid] onCellValueChanged, id ${evt.data.hierarchy},col: ${evt.colDef.field}, ${evt.newValue} <- ${evt.oldValue}`);
        });
        this.onGridReady = (params) => {
            this.props.model.gridApi = params.api;
        };
        /*
        暂时先用 ag-grid 内置 menu
        todo 后续看下 group cell 的 onContextMenu 接出来
         */
        this.getContextMenuItems = (params) => {
            if (!params.node)
                throw new Error(`Add child to ${params.value} but node is null`);
            const title = params.node.data.title;
            return [
                {
                    name: `Add child to ${title}`,
                    action: () => {
                        this.props.model.addChild(params.value);
                    },
                },
                {
                    name: `Remove ${title}`,
                    action: () => {
                        this.props.model.remove(params.value);
                    },
                },
            ];
        };
    }
    render() {
        return (_jsx(AgGridReact, { modules: [
                ClientSideRowModelModule,
                RowGroupingModule,
                MenuModule,
            ], ref: ref => (this.gridRef = ref), rowData: this.props.model.rowData, columnDefs: this.props.model.columnDefs, defaultColDef: {
                flex: 1,
            }, autoGroupColumnDef: {
                headerName: '#',
                minWidth: 150,
                cellRendererParams: {
                    suppressCount: true,
                    checkbox: true,
                },
            }, treeData: true, groupDefaultExpanded: -1, rowHeight: 42, getContextMenuItems: this.getContextMenuItems, getDataPath: this.props.model.getDataPath, onGridReady: this.onGridReady, onCellValueChanged: this.onCellValueChanged }));
    }
};
TreeGrid = __decorate([
    observer
], TreeGrid);
export { TreeGrid };
//# sourceMappingURL=tree-grid.js.map