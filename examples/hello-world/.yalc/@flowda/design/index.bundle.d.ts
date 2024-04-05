/// <reference types="react" />
import { ContainerModule, interfaces } from 'inversify';
import * as React$1 from 'react';
import { Component } from 'react';
import { SortModelItem } from 'ag-grid-community/dist/lib/sortController';
import { GridApi, GridReadyEvent, CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { resourceColumnSchema, resourceSchema, agFilterSchema, getResourceInputSchema, getResourceDataInputSchema, getResourceDataOutputSchema, putResourceDataInputSchema, JSONObject, loginInputSchemaDto, loginOutputSchemaDto } from '@flowda/types';
import { z } from 'zod';
import { FormikProps } from 'formik';

declare const designModule: ContainerModule;
declare const bindDesignModule: (bind: interfaces.Bind) => void;

declare class GridModel {
    static KEY: string;
    columnDefs: z.infer<typeof resourceColumnSchema>[];
    schemaName: string | null;
    schema: z.infer<typeof resourceSchema> | null;
    filterModel: z.infer<typeof agFilterSchema> | null;
    handlers: Partial<{
        onRefClick: (v: {
            schemaName: string;
            name: string;
            id: number | string;
        }) => void;
        onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onContextMenu: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        getResourceSchema: (input: z.infer<typeof getResourceInputSchema>) => Promise<z.infer<typeof resourceSchema>>;
        getResourceData: (input: z.infer<typeof getResourceDataInputSchema>) => Promise<z.infer<typeof getResourceDataOutputSchema>>;
        putResourceData: (input: z.infer<typeof putResourceDataInputSchema>) => Promise<unknown>;
    }>;
    isNotEmpty: boolean;
    gridApi: GridApi | null;
    refresh(): void;
    setColumnDefs(columnDefs: z.infer<typeof resourceColumnSchema>[]): void;
    setSchemaName(schemaName: string): void;
    constructor();
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
    onMouseEnter(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
    onContextMenu(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
    onRefClick(field: string, value: number | string): void;
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

export { Grid, GridModel, type GridProps, Login, LoginModel, ThemeModel, bindDesignModule, designModule, getFinalFilterModel, tryExtractFilterModelFromRef };
