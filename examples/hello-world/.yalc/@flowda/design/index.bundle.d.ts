/// <reference types="react" />
import * as React$1 from 'react';
import { Component } from 'react';
import { GridApi, SortModelItem, ColDef, IRowNode, CellValueChangedEvent } from 'ag-grid-community';
import { ColumnUISchema, ResourceUISchema, handleContextMenuInputSchema, getResourceInputSchema, getResourceDataInputSchema, getResourceDataOutputSchema, putResourceDataInputSchema, agFilterSchema, cellRendererInputSchema, JSONObject, loginInputSchemaDto, loginOutputSchemaDto } from '@flowda/types';
import { z } from 'zod';
import { ContainerModule, interfaces } from 'inversify';
import { FormikProps } from 'formik';
import { URI } from '@theia/core';

declare class GridModel {
    columnDefs: z.infer<typeof ColumnUISchema>[];
    schemaName: string | null;
    schema: z.infer<typeof ResourceUISchema> | null;
    isNotEmpty: boolean;
    gridApi: GridApi | null;
    /**
     * 等待 setRef 也就是 widget render 然后才能调用 this.ref.setColDefs
     * 原因是 setColDefs 有 React（cellRenderer）不能放在 grid.model 里
     */
    private refPromise?;
    handlers: Partial<{
        onRefClick: (v: {
            schemaName: string;
            name: string;
            id: number | string;
        }) => void;
        onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onContextMenu: (input: z.infer<typeof handleContextMenuInputSchema>, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    }>;
    apis: Partial<{
        getResourceSchema: (input: z.infer<typeof getResourceInputSchema>) => Promise<z.infer<typeof ResourceUISchema>>;
        getResourceData: (input: z.infer<typeof getResourceDataInputSchema>) => Promise<z.infer<typeof getResourceDataOutputSchema>>;
        putResourceData: (input: z.infer<typeof putResourceDataInputSchema>) => Promise<unknown>;
    }>;
    private ref;
    private uri?;
    private refResolve?;
    /**
     * 在 ResourceWidgetFactory#createWidget 重置 promise
     * 因为目前 grid.model 在 tab 关闭并不会销毁 todo 可以销毁 这样流程简单很多
     */
    resetRefPromise(uri: string): void;
    refresh(): void;
    /**
     * `<Grid ref={ref => this.setRef(ref)} />`
     */
    setRef(ref: unknown, uri?: string): void;
    setSchemaName(schemaName: string): void;
    getCol(schemaName: string): Promise<void>;
    getData(params: {
        schemaName: string;
        current: number;
        pageSize: number;
        sort: SortModelItem[];
        filterModel: z.infer<typeof agFilterSchema>;
    }): Promise<{
        data: any[];
        pagination: {
            total: number;
        };
    }>;
    putData(id: number, updatedValue: unknown): Promise<void>;
    readonly onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    readonly onContextMenu: (cellRendererInput: z.infer<typeof cellRendererInputSchema>, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onRefClick(field: string, value: any): void;
}
/**
 * @deprecated 改成从 uri 恢复，任何 filter 手动修改都同步修改 uri
 * 之前设计太复杂了，因为之前不清楚 vscode-uri 的机制，以及 edit-manager 如何管理 uri
 * 就临时外接了一套管理 filter 持久化的
 *
 * 情况1：刷新 尝试从 localStorage 恢复
 *       注意：非刷新 关闭 tab 则认为清空条件
 * 情况2：非刷新，跳转修改 filter，则覆盖
 * 情况3：非刷新 手动修改 优先级最高
 *
 * @param param ag grid 前端传入
 * @param mem 内存 grid model 维护
 * @param storage localStorage
 */
declare function getFinalFilterModel(param: z.infer<typeof agFilterSchema>, mem: z.infer<typeof agFilterSchema> | null, storage: JSONObject): z.infer<typeof agFilterSchema> | null;
declare function tryExtractFilterModelFromRef(storage: JSONObject): z.infer<typeof agFilterSchema>;

declare class TreeGridModel {
    gridApi: GridApi | null;
    columnDefs: ColDef<any, any>[];
    private uri?;
    private gridModel?;
    /**
     * 等待 onGridReady 对 gridApi 赋值
     */
    private gridReadyPromise?;
    private gridReadyResolve?;
    handlers: Partial<{
        message: (title: string) => void;
    }>;
    resetGridReadyPromise(uri: string): void;
    setGridApi(gridApi: GridApi): void;
    setUri(uri: string): void;
    loadData(): Promise<void>;
    setGridModel(gridModel: GridModel): void;
    getDataPath(data: unknown): string[];
    private convertAndSaveMenuData;
    addChild(id: number): void;
    remove(node: IRowNode | null): void;
    handleCellValueChanged: (evt: CellValueChangedEvent) => void;
}

type TreeGridProps = {
    model: TreeGridModel;
};
declare class TreeGrid extends Component<TreeGridProps> {
    private gridRef;
    private readonly onCellValueChanged;
    private readonly onGridReady;
    private readonly getContextMenuItems;
    render(): JSX.Element;
}

declare const designModule: ContainerModule;
declare const bindDesignModule: (bind: interfaces.Bind) => void;

type GridProps = {
    uri?: string;
    model: GridModel;
};
declare class Grid extends React$1.Component<GridProps> {
    private gridRef;
    private readonly onGridReady;
    private readonly onCellValueChanged;
    setColDefs: () => void;
    autoResizeAll(): void;
    render(): JSX.Element;
}

declare class ThemeModel {
    colorMode: 'light' | 'dark';
    constructor();
    setColorMode(colorMode: 'light' | 'dark'): void;
}

declare class LoginModel {
    theme: ThemeModel;
    formikProps: FormikProps<loginInputSchemaDto> | undefined;
    isLogin: boolean;
    handlers: Partial<{
        info: (message: string, opts: {
            timeout: number;
        }) => void;
        validate: (input: loginInputSchemaDto) => Promise<loginOutputSchemaDto>;
    }>;
    constructor(theme: ThemeModel);
    setIsLogin(isLogin: boolean): void;
    checkLogin(): void;
    login(accept?: () => Promise<void>): Promise<void>;
    logout(): void;
}

declare class Login extends React$1.Component<{
    model: LoginModel;
}> {
    render(): JSX.Element;
}

declare function getUriDisplayName(uri: URI): string;
declare function getUriSchemaName(uri: URI): string;
declare function createTreeGridUri(uri: string | URI, id: string, field: string): URI;
declare function uriWithoutId(uri: string): string;
declare function convertTreeGridUriToGridUri(uriParam: string): string;
declare function getTreeUriQuery(uriParam: string): {
    id: string;
    field: string;
    schemaName: string;
    displayName: string;
};
declare function createRefUri(input: z.infer<typeof handleContextMenuInputSchema>): URI;

export { Grid, GridModel, type GridProps, Login, LoginModel, ThemeModel, TreeGrid, TreeGridModel, type TreeGridProps, bindDesignModule, convertTreeGridUriToGridUri, createRefUri, createTreeGridUri, designModule, getFinalFilterModel, getTreeUriQuery, getUriDisplayName, getUriSchemaName, tryExtractFilterModelFromRef, uriWithoutId };
