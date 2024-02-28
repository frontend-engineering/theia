import { ContainerModule, interfaces } from 'inversify';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { Component } from 'react';
import { IResourceColumnSchema, IResourceSchema, loginSchemaDto } from '@flowda-projects/flowda-shared-types';
import { SortModelItem } from 'ag-grid-community/dist/lib/sortController';
import { CreateTRPCProxyClient } from '@trpc/client';
import { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server';
import { GridApi, GridReadyEvent, CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { FormikProps } from 'formik';

declare const designModule: ContainerModule;
declare const bindDesignModule: (bind: interfaces.Bind) => void;

declare class GridModel {
    private trpcFactory;
    static KEY: string;
    columnDefs: IResourceColumnSchema[];
    schemaName: string | null;
    schema: IResourceSchema | null;
    filterModel: any;
    handlers: Partial<{
        onClickRef: (v: {
            schemaName: string;
            name: string;
            id: number;
        }) => void;
    }>;
    isNotEmpty: boolean;
    gridApi: GridApi | null;
    refresh(): void;
    setColumnDefs(columnDefs: IResourceColumnSchema[]): void;
    setSchemaName(schemaName: string): void;
    constructor(trpcFactory: () => CreateTRPCProxyClient<AppRouter>);
    getCol(schemaName: string): Promise<void>;
    /**
     * @deprecated
     */
    convertIdToAgFilterModel(id: number): {
        id: {
            filterType: string;
            type: string;
            filter: number;
        };
    };
    getData(params: {
        schemaName: string;
        current: number;
        pageSize: number;
        sort: SortModelItem[];
        filterModel: any;
    }): Promise<any>;
    getResourceQuery(): any;
    putData(id: number, updatedValue: any): Promise<void>;
    onClickRef(field: string, value: number): void;
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
declare function getFinalFilterModel(param: any, mem: any, storage: any): any;
declare function tryExtractFilterModelFromRef(storage: any): {
    _ref?: string | undefined;
} | Record<string, {
    filter: string | number;
    type: "equals" | "contains";
    filterType: "number" | "text";
} | {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "equals" | "contains";
        filterType: "number" | "text";
    }[];
}> | undefined;

declare function shortenDatetime(text: string): string;
type GridProps = {
    model: GridModel;
};
declare class Grid extends Component<GridProps> {
    private gridRef;
    constructor(props: GridProps);
    onGridReady(params: GridReadyEvent): Promise<void>;
    onCellValueChanged(evt: CellValueChangedEvent): Promise<void>;
    columnDefs(): ColDef<any, any>[];
    autoResizeAll(): void;
    render(): react_jsx_runtime.JSX.Element;
}

declare class LoginModel {
    private trpcFactory;
    formikProps: FormikProps<loginSchemaDto> | undefined;
    isLogin: boolean;
    handlers: Partial<{
        info: (message: string, opts: {
            timeout: number;
        }) => void;
    }>;
    constructor(trpcFactory: () => CreateTRPCProxyClient<AppRouter>);
    setIsLogin(isLogin: boolean): void;
    checkLogin(): void;
    login(accept?: () => Promise<void>): Promise<void>;
    logout(): void;
}

declare class Login extends React.Component<{
    model: LoginModel;
}> {
    render(): react_jsx_runtime.JSX.Element;
}

export { Grid, GridModel, type GridProps, Login, LoginModel, bindDesignModule, designModule, getFinalFilterModel, shortenDatetime, tryExtractFilterModelFromRef };
