/// <reference types="react" />
import type { SortModelItem } from 'ag-grid-community/dist/lib/sortController';
import type { GridApi } from 'ag-grid-community';
import { agFilterSchema, getResourceDataInputSchema, getResourceDataOutputSchema, getResourceInputSchema, type JSONObject, putResourceDataInputSchema, resourceColumnSchema, resourceSchema } from '@flowda/types';
import { z } from 'zod';
export declare class GridModel {
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
export declare function getFinalFilterModel(param: z.infer<typeof agFilterSchema>, mem: z.infer<typeof agFilterSchema> | null, storage: JSONObject): z.infer<typeof agFilterSchema> | null;
export declare function tryExtractFilterModelFromRef(storage: JSONObject): z.infer<typeof agFilterSchema>;
