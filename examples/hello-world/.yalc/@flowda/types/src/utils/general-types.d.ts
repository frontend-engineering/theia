export type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;
export interface JSONObject {
    [x: string]: JSONValue;
}
