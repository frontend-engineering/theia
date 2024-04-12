import { treeGridUriQuerySchema } from '@flowda/types';
import { URI } from '@theia/core';
import * as qs from 'qs';
export function getUriDisplayName(uri) {
    const query = qs.parse(uri.query);
    if (!('displayName' in query) || typeof query.displayName !== 'string')
        throw new Error(`query must have displayName and is string, ${uri.toString()}`);
    return query.displayName;
}
export function getUriSchemaName(uri) {
    const query = qs.parse(uri.query);
    if (!('schemaName' in query) || typeof query.schemaName !== 'string')
        throw new Error(`query must have schemaName and is string, ${uri.toString()}`);
    return query.schemaName;
}
export function createTreeGridUri(uri, id, field) {
    if (typeof uri === 'string') {
        uri = new URI(uri);
    }
    const displayName = getUriDisplayName(uri);
    return new URI(`tree-grid://${uri.authority}?schemaName=${encodeURIComponent(`${getUriSchemaName(uri)}&displayName=${displayName}#${id}:${field}`)}&id=${id}&field=${field}`);
}
export function gridUriAsKey(uri) {
    return `${uri.scheme}://${uri.authority}?schemaName=${getUriSchemaName(uri)}`;
}
export function treeGridUriAsKey(uri) {
    const query = qs.parse(uri.query);
    return `${uri.scheme}://${uri.authority}?schemaName=${getUriSchemaName(uri)}&field=${query.field}`;
}
export function uriWithoutId(uri) {
    return uri.slice(0, uri.lastIndexOf(':'));
}
export function convertTreeGridUriToGridUri(uriParam) {
    const query = getTreeUriQuery(uriParam);
    const uri = new URI(uriParam);
    const displayName = query.displayName.split('#')[0];
    const gridUri = `grid://${uri.authority}?schemaName=${query.schemaName}&displayName=${displayName}`;
    return gridUri;
}
export function getTreeUriQuery(uriParam) {
    const uri = new URI(uriParam);
    const query = qs.parse(uri.query);
    const queryParsedRet = treeGridUriQuerySchema.parse(query);
    return queryParsedRet;
}
export function createRefUri(input) {
    var _a, _b;
    const uri = new URI(input.uri);
    if (input.column.column_type !== 'reference')
        throw new Error(`column_type should be reference, ${input.column.name}, ${input.column.column_type}`);
    if (input.column.reference == null)
        throw new Error(`column_type reference should have reference, ${input.column.name}`);
    const id = (_b = (_a = input.cellRendererInput) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b[input.column.reference.primary_key];
    if (id == null)
        throw new Error(`column:${input.column.name} ${input.column.reference.primary_key} value is null`);
    const schemaName = input.column.reference.model_name;
    //    ^?
    const retUri = `grid://${uri.authority}?schemaName=${schemaName}ResourceSchema&displayName=${input.column.reference.display_name}&${input.column.reference.primary_key}=${id}`;
    return new URI(retUri);
}
//# sourceMappingURL=uri-utils.js.map