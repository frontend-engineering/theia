/// <reference types="react" />
import * as React$1 from 'react';
import { Component } from 'react';
import { GridApi, SortModelItem, ColDef } from 'ag-grid-community';
import { ColumnUISchema, ResourceUISchema, handleContextMenuInputSchema, getResourceInputSchema, getResourceDataInputSchema, getResourceDataOutputSchema, putResourceDataInputSchema, agFilterSchema, JSONObject, cellRendererInputSchema, loginInputSchemaDto, loginOutputSchemaDto } from '@flowda/types';
import { z } from 'zod';
import { ContainerModule, interfaces } from 'inversify';
import { FormikProps } from 'formik';
import { URI } from '@theia/core';

declare class GridModel {
    static KEY: string;
    columnDefs: z.infer<typeof ColumnUISchema>[];
    schemaName: string | null;
    schema: z.infer<typeof ResourceUISchema> | null;
    isNotEmpty: boolean;
    gridApi: GridApi | null;
    /**
     * 等待 setRef 也就是 widget render 然后才能调用 this.ref.setColDefs
     * 原因是 setColDefs 有 React（cellRenderer）不能放在 grid.model 里
     */
    refPromise?: Promise<boolean>;
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
    private filterModel;
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
    getResourceQuery(): JSONObject;
    putData(id: number, updatedValue: unknown): Promise<void>;
    readonly onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    readonly onContextMenu: (cellRendererInput: z.infer<typeof cellRendererInputSchema>, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onRefClick(field: string, value: any): void;
}
/**
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
    private uri?;
    rowData: Array<{
        hierarchy: string[];
        id: number;
        title?: string;
        url?: string;
        icon?: string;
    }>;
    columnDefs: ColDef<any, any>[];
    private gridModel?;
    handlers: Partial<{
        message: (title: string) => void;
    }>;
    setUri(uri: string): void;
    loadData(): Promise<void>;
    setGridModel(gridModel: GridModel): void;
    getDataPath(data: unknown): string[];
    addChild(id: number): void;
    remove(id: string): void;
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
/**
 * @deprecated
 */
declare function uriWithoutId(uri: string): string;
declare function convertTreeGridUriToGridUri(uriParam: string): string;
declare function getTreeUriQuery(uriParam: string): {
    id: string;
    field: string;
    schemaName: string;
    displayName: string;
};

export { Grid, GridModel, type GridProps, Login, LoginModel, ThemeModel, TreeGrid, TreeGridModel, type TreeGridProps, bindDesignModule, convertTreeGridUriToGridUri, createTreeGridUri, designModule, getFinalFilterModel, getTreeUriQuery, getUriDisplayName, getUriSchemaName, tryExtractFilterModelFromRef, uriWithoutId };
