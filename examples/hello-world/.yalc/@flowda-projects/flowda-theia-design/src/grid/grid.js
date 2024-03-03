import { __decorate, __metadata } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
export function shortenDatetime(text) {
    if (!dayjs(text).isValid())
        return text;
    let shortFormat;
    if (dayjs(text).isSame(dayjs(), 'year')) {
        shortFormat = 'MM-DD HH:mm';
    }
    else {
        shortFormat = 'YY-MM-DD HH:mm';
    }
    return dayjs(text).format(shortFormat);
}
let Grid = class Grid extends Component {
    constructor(props) {
        super(props);
        this.gridRef = null;
        this.onGridReady = this.onGridReady.bind(this);
        this.onCellValueChanged = this.onCellValueChanged.bind(this);
    }
    async onGridReady(params) {
        console.log('[Grid] onGridReady', this.props.model.schemaName);
        this.props.model.gridApi = params.api;
        const datasource = {
            getRows: async (params) => {
                if (this.props.model.schemaName) {
                    const ret = await this.props.model.getData({
                        schemaName: this.props.model.schemaName,
                        // todo: 分页参数逻辑 后续重构可以下沉到 node 端，即服务端直接接收 startRow endRow
                        current: params.endRow / (params.endRow - params.startRow),
                        pageSize: params.endRow - params.startRow,
                        sort: params.sortModel,
                        filterModel: params.filterModel,
                    });
                    console.log(`[Grid] successCallback`);
                    params.successCallback(ret.data, ret.pagination.total);
                    // this.props.model.gridApi?.setGridOption('pinnedTopRowData', [ret.data[0]])
                    // 只在第一次有值的时候做 resize 后续分页或者刷新就不要 resize 了
                    if (!this.props.model.isNotEmpty && ret.data != null) {
                        setTimeout(() => this.autoResizeAll(), 0);
                    }
                    this.props.model.isNotEmpty = ret.data != null;
                }
                else {
                    console.warn('schemaName is null');
                }
            },
        };
        params.api.setGridOption('datasource', datasource);
    }
    async onCellValueChanged(evt) {
        console.log(`[Grid] onCellValueChanged, id ${evt.data.id},col: ${evt.colDef.field}, ${evt.newValue} <- ${evt.oldValue}`);
        await this.props.model.putData(evt.data.id, {
            [evt.colDef.field]: evt.newValue,
        });
    }
    columnDefs() {
        return this.props.model.columnDefs.map(item => {
            // todo: 图片需要搞一个 modal 并且上传修改
            if (item.name === 'image') {
                return {
                    field: item.name,
                    headerName: item.display_name,
                    cellDataType: 'text',
                    cellRenderer: param => {
                        if (!param.value)
                            return param.value;
                        return (_jsx("img", { style: {
                                cursor: 'pointer',
                                width: 38,
                                borderRadius: '50%',
                                border: '0.5px solid white',
                                boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.2)',
                            }, src: param.value }));
                    },
                };
            }
            if (item.name === this.props.model.schema?.primary_key) {
                return {
                    minWidth: 110,
                    field: item.name,
                    headerName: item.display_name,
                    cellDataType: 'number',
                    pinned: 'left',
                    filter: true,
                    floatingFilter: true,
                };
            }
            switch (item.column_type) {
                case 'reference': {
                    return {
                        editable: false,
                        field: item.name,
                        headerName: item.display_name,
                        cellRenderer: param => {
                            return (_jsx("a", { href: "", onClick: e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.props.model.onRefClick(param.colDef.field, param.value);
                                }, onMouseEnter: this.props.model.handlers.onMouseEnter, children: param.value }));
                        },
                    };
                }
                case 'tag': {
                    const options = item.format.select_options;
                    const refData = options.reduce((acc, cur) => {
                        acc[cur.value] = cur.label;
                        return acc;
                    }, {});
                    return {
                        editable: true,
                        field: item.name,
                        headerName: item.display_name,
                        cellEditor: 'agSelectCellEditor',
                        cellDataType: 'text',
                        cellEditorParams: {
                            values: options.map(o => o.value),
                        },
                        refData: refData,
                    };
                }
                case 'integer':
                    return {
                        field: item.name,
                        headerName: item.display_name,
                        cellDataType: 'number',
                    };
                case 'boolean':
                    return {
                        field: item.name,
                        headerName: item.display_name,
                        cellDataType: 'boolean',
                    };
                case 'datetime':
                    return {
                        field: item.name,
                        headerName: item.display_name,
                        // cellDataType: 'date', // todo: 需要后端支持
                        valueFormatter: params => {
                            if (params.value) {
                                return shortenDatetime(params.value);
                            }
                            else {
                                return params.value;
                            }
                        },
                        // tooltipField: item.name, // 不能和 tooltipValueGetter 一起用
                        tooltipValueGetter: params => {
                            if (params.value) {
                                const ret = dayjs(params.value).format('YYYY-MM-DD HH:mm:ss');
                                return ret;
                            }
                            else {
                                return params.value;
                            }
                        },
                        // cellRenderer: ShortDatetime,
                    };
                case 'string':
                case 'textarea':
                    return {
                        editable: true,
                        field: item.name,
                        headerName: item.display_name,
                        cellDataType: 'text',
                        filter: true,
                        floatingFilter: true,
                    };
                default:
                    return {
                        editable: true,
                        field: item.name,
                        headerName: item.display_name,
                    };
            }
        });
    }
    /*
    注意文档中这句话 https://www.ag-grid.com/react-data-grid/column-sizing/#shift-resizing
     Note that using autoSizeStrategy to fit cell contents only works for the Client-Side Row Model and Server-Side Row Model,
     but the API methods work for all row models.
  
     这里在数据请求后调用 api 进行 autosize
  
     todo 第一次调用之后 如果用户有调整过 则存储到 localStorage 优先用户本地存储
     */
    autoResizeAll() {
        console.log(`[Grid] autoResizeAll`);
        const allColumnIds = [];
        this.gridRef.api.getColumns().forEach(column => {
            allColumnIds.push(column.getId());
        });
        this.gridRef.api.autoSizeColumns(allColumnIds, false);
    }
    render() {
        return (_jsx(AgGridReact, { ref: ref => (this.gridRef = ref), defaultColDef: {
                maxWidth: 400,
            }, columnDefs: this.columnDefs(), pagination: true, paginationPageSize: 20, cacheBlockSize: 20, rowModelType: 'infinite', getRowId: (params) => params.data.id, onGridReady: this.onGridReady, onCellValueChanged: this.onCellValueChanged }));
    }
};
Grid = __decorate([
    observer,
    __metadata("design:paramtypes", [Object])
], Grid);
export { Grid };
//# sourceMappingURL=grid.js.map