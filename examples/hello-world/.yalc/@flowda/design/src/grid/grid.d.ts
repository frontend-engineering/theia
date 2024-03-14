import { Component } from 'react';
import { GridModel } from './grid.model';
import { CellValueChangedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
export type GridProps = {
    model: GridModel;
};
export declare class Grid extends Component<GridProps> {
    private gridRef;
    constructor(props: GridProps);
    onGridReady(params: GridReadyEvent): Promise<void>;
    onCellValueChanged(evt: CellValueChangedEvent): Promise<void>;
    columnDefs(): ColDef<any, any>[];
    autoResizeAll(): void;
    render(): JSX.Element;
}
