/// <reference types="react" />
import * as React$1 from 'react';
import { Component } from 'react';
import { GridApi, ColDef, IRowNode, CellValueChangedEvent, SortModelItem } from 'ag-grid-community';
import { URI } from '@theia/core';
import { ManageableModel, ApiService, getResourceInputSchema, ResourceUISchema, getResourceDataInputSchema, getResourceDataOutputSchema, putResourceDataInputSchema, ColumnUISchema, ResourceUI, handleContextMenuInputSchema, ICustomResource, CellRenderer, agFilterSchema, CellRendererInput, loginInputSchemaDto, loginOutputSchemaDto, wfCfgSchema, DefaultFormValueType, ColumUI } from '@flowda/types';
import { ContainerModule, interfaces } from 'inversify';
import { z } from 'zod';
import { FormikProps } from 'formik';

declare class TreeGridModel implements ManageableModel {
    apiService: ApiService;
    gridApi: GridApi | null;
    columnDefs: ColDef<any, any>[];
    private uri?;
    /**
     * 等待 onGridReady 对 gridApi 赋值
     */
    private gridReadyPromise;
    private gridReadyResolve?;
    constructor(apiService: ApiService);
    handlers: Partial<{
        message: (title: string) => void;
    }>;
    getUri(): string;
    getTenant(): string;
    setGridApi(gridApi: GridApi): void;
    setUri(uri: string | URI): void;
    onCurrentEditorChanged(): Promise<void>;
    loadData(): Promise<void>;
    getDataPath(data: Record<string, unknown>): string[];
    private convertAndSaveMenuData;
    addChild(id: number): void;
    addPeer(id: number): void;
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
declare class NotImplementedApiService implements ApiService {
    getResourceSchema(input: z.infer<typeof getResourceInputSchema>): Promise<z.infer<typeof ResourceUISchema>>;
    getResourceData(input: z.infer<typeof getResourceDataInputSchema>): Promise<z.infer<typeof getResourceDataOutputSchema>>;
    putResourceData(input: z.infer<typeof putResourceDataInputSchema>): Promise<unknown>;
}
declare const bindDesignModule: (bind: interfaces.Bind) => void;

declare class ThemeModel {
    colorMode: 'light' | 'dark';
    constructor();
    setColorMode(colorMode: 'light' | 'dark'): void;
}
declare const EUI_DARK_COLORS: {
    ghost: string;
    ink: string;
    primary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    emptyShade: string;
    lightestShade: string;
    lightShade: string;
    mediumShade: string;
    darkShade: string;
    darkestShade: string;
    fullShade: string;
    body: string;
    highlight: string;
    disabled: string;
    disabledText: string;
    shadow: string;
    primaryText: string;
    accentText: string;
    successText: string;
    warningText: string;
    dangerText: string;
    text: string;
    title: string;
    subduedText: string;
    link: string;
};
declare const EUI_LIGHT_COLORS: {
    ghost: string;
    ink: string;
    primary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    emptyShade: string;
    lightestShade: string;
    lightShade: string;
    mediumShade: string;
    darkShade: string;
    darkestShade: string;
    fullShade: string;
    body: string;
    highlight: string;
    disabled: string;
    disabledText: string;
    shadow: string;
    primaryText: string;
    accentText: string;
    successText: string;
    warningText: string;
    dangerText: string;
    text: string;
    title: string;
    subduedText: string;
    link: string;
};

declare class GridModel implements ManageableModel {
    theme: ThemeModel;
    apiService: ApiService;
    private customResources;
    columnDefs: z.infer<typeof ColumnUISchema>[];
    schemaName: string | null;
    schema: ResourceUI | null;
    isNotEmpty: boolean;
    gridApi: GridApi | null;
    /**
     * 是否是首次请求数据
     * 首次请求数据 smartMergeFilterModel 则只返回 uri
     * 否则根据 params.filterModel 进行合并
     */
    private _isFirstGetRows;
    get isFirstGetRows(): boolean;
    /**
     * 等待 setRef 也就是 widget render 然后才能调用 this.ref.setColDefs
     * 原因是 setColDefs 有 React（cellRenderer）不能放在 grid.model 里
     */
    private refPromise;
    private refResolve?;
    private schemaReadyResolve?;
    schemaReadyPromise?: Promise<boolean>;
    handlers: Partial<{
        onRefClick: (v: {
            schemaName: string;
            name: string;
            id: number | string;
        }) => void;
        onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onContextMenu: (input: z.infer<typeof handleContextMenuInputSchema>, e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        onClickNew: (uri: URI) => void;
    }>;
    private ref;
    private _uri?;
    constructor(theme: ThemeModel, apiService: ApiService, customResources: ICustomResource[]);
    setGridApi(api: GridApi<unknown>): void;
    getUri(): string;
    getTenant(): string;
    setUri(uri: string | URI): void;
    refresh(fromToolbar?: boolean): Promise<void>;
    /**
     * `<Grid ref={ref => this.setRef(ref)} />`
     */
    setRef(ref: unknown, uri?: string): void;
    setSchemaName(schemaName: string): void;
    getCustomResource(): ICustomResource | undefined;
    getCustomCellRenderer(colName: string): undefined | CellRenderer;
    onCurrentEditorChanged(): Promise<void>;
    getCol(schemaName: string): Promise<void>;
    isOpenTask(colName: string): boolean | undefined;
    getData(params: {
        schemaName: string;
        current: number;
        pageSize: number;
        sort: SortModelItem[];
        filterModel: z.infer<typeof agFilterSchema>;
    }): Promise<{
        data: any;
        pagination: {
            total: any;
        };
    }>;
    putData(id: number, updatedValue: unknown): Promise<void>;
    readonly onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    readonly onContextMenu: (cellRendererInput: CellRendererInput, e: React.MouseEvent<HTMLElement, MouseEvent>, options?: {
        type: 'association' | undefined;
    }) => void;
    onRefClick(field: string, value: string | number): void;
    onNewForm(): void;
}

type GridProps = {
    uri?: string;
    model: GridModel;
};
declare class Grid extends React$1.Component<GridProps> {
    private gridRef;
    render(): JSX.Element;
    private readonly onGridReady;
    private readonly onCellValueChanged;
    setColDefs: () => void;
    autoResizeAll(): void;
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
declare function getUriSchemaName(uri: string | URI): string;
declare function createTreeGridUri(uri: string | URI, id: string, field: string): URI;
declare function uriAsKey(uri: URI | string): string;
declare function uriWithoutId(uri: string): string;
declare function extractId(id: string): number;
declare function convertTreeGridUriToGridUri(uri: string | URI): string;
declare function getTreeUriQuery(uri: string | URI): {
    field: string;
    schemaName: string;
    displayName: string;
    id: string;
};
declare function createRefUri(input: z.infer<typeof handleContextMenuInputSchema>): URI;
declare function getUriFilterModel(uri: URI | string): z.infer<typeof agFilterSchema>;
/**
 * @deprecated @see smartMergeFilterModel
 */
declare function mergeUriFilterModel(uri: URI | string, filterModel: z.infer<typeof agFilterSchema>): z.infer<typeof agFilterSchema>;
declare function updateUriFilterModel(uri: URI | string, paramsFilterModel: z.infer<typeof agFilterSchema>): URI;
declare function isUriLikeEqual(a: URI | string, b: URI | string): boolean;
declare function isUriAsKeyLikeEqual(a: URI | string, b: URI | string): boolean;
declare function createAssociationUri(input: z.infer<typeof handleContextMenuInputSchema>): URI;
declare function createTaskUri(input: z.infer<typeof handleContextMenuInputSchema>): URI;
declare function createNewFormUri(uri: string | URI): URI;

declare class TaskFormModel implements ManageableModel {
    theme: ThemeModel;
    apiService: ApiService;
    wfCfgs: z.infer<typeof wfCfgSchema>[];
    formikProps: FormikProps<DefaultFormValueType> | undefined;
    private _taskDefinitionKey;
    private _taskId;
    schema: ResourceUI | undefined;
    onCurrentEditorChanged(): Promise<void>;
    get taskId(): string;
    get taskDefinitionKey(): string;
    get wfCfg(): {
        resource: {
            columns: {
                access_type: "read_only" | "read_write";
                name: string;
            }[];
            schemaName: string;
            inputMap: Record<string, string>;
        };
        taskDefinitionKey: string;
    };
    getSchema(): Promise<{
        display_name: string;
        visible: boolean;
        slug: string;
        primary_key: string | null;
        class_name: string;
        name: string;
        table_name: string;
        display_primary_key: string;
        namespace: string;
        columns: {
            column_type: string;
            display_name: string;
            visible: boolean;
            access_type: "read_only" | "read_write";
            name: string;
            validators: unknown[];
            description?: string | undefined;
            example?: string | undefined;
            plugins?: any;
            reference?: {
                display_name: string;
                model_name: string;
                foreign_key: string;
                primary_key: string;
                reference_type: "belongs_to";
            } | {
                display_name: string;
                visible: boolean;
                model_name: string;
                foreign_key: string;
                primary_key: string;
                reference_type: "has_one";
            } | undefined;
        }[];
        associations: {
            display_name: string;
            visible: boolean;
            slug: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
        }[];
        plugins?: any;
        display_column?: string | undefined;
        searchable_columns?: string | undefined;
    }>;
    get columns(): {
        access_type: "read_only" | "read_write";
        name: string;
        column_type: string;
        display_name: string;
        visible: boolean;
        validators: unknown[];
        description?: string | undefined;
        example?: string | undefined;
        plugins?: any;
        reference?: {
            display_name: string;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "belongs_to";
        } | {
            display_name: string;
            visible: boolean;
            model_name: string;
            foreign_key: string;
            primary_key: string;
            reference_type: "has_one";
        } | undefined;
    }[];
    get defaultInitialValues(): Record<string, string>;
    initialBackendValues: {};
    private uri?;
    constructor(theme: ThemeModel, apiService: ApiService, wfCfgs: z.infer<typeof wfCfgSchema>[]);
    getUri(): string;
    getTenant(): string;
    setUri(uri: string | URI): void;
    loadTask(uri: string | URI): Promise<void>;
    submit(values: DefaultFormValueType): Promise<void>;
}

type TaskFormProps = {
    model: TaskFormModel;
};
declare class TaskForm extends Component<TaskFormProps> {
    render(): JSX.Element;
}

declare class NewFormModel implements ManageableModel {
    theme: ThemeModel;
    apiService: ApiService;
    formikProps: FormikProps<DefaultFormValueType> | undefined;
    schema: ResourceUI | undefined;
    formItemColumns: ColumUI[];
    onCurrentEditorChanged(): Promise<void>;
    get defaultInitialValues(): Record<string, string>;
    private uri?;
    constructor(theme: ThemeModel, apiService: ApiService);
    getTenant(): string;
    getUri(): string;
    setUri(uri: string | URI): void;
    loadSchema(uri: string | URI): Promise<void>;
    submit(values: DefaultFormValueType): Promise<void>;
}

type NewFormProps = {
    model: NewFormModel;
};
declare class NewForm extends Component<NewFormProps> {
    render(): JSX.Element;
}
declare class NewFormInner extends Component<NewFormProps & {
    formikProps: FormikProps<DefaultFormValueType>;
}> {
    render(): JSX.Element;
}

export { EUI_DARK_COLORS, EUI_LIGHT_COLORS, Grid, GridModel, type GridProps, Login, LoginModel, NewForm, NewFormInner, NewFormModel, type NewFormProps, NotImplementedApiService, TaskForm, TaskFormModel, type TaskFormProps, ThemeModel, TreeGrid, TreeGridModel, type TreeGridProps, bindDesignModule, convertTreeGridUriToGridUri, createAssociationUri, createNewFormUri, createRefUri, createTaskUri, createTreeGridUri, designModule, extractId, getTreeUriQuery, getUriDisplayName, getUriFilterModel, getUriSchemaName, isUriAsKeyLikeEqual, isUriLikeEqual, mergeUriFilterModel, updateUriFilterModel, uriAsKey, uriWithoutId };
