import { __rest } from "tslib";
import { treeGridUriQuerySchema } from '@flowda/types';
import { URI } from '@theia/core';
import * as qs from 'qs';
import * as _ from 'radash';
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
export function uriAsKey(uri) {
    if (typeof uri === 'string')
        uri = new URI(uri);
    const query = qs.parse(uri.query);
    const { displayName, filterModel } = query, rest = __rest(query, ["displayName", "filterModel"]);
    return `${uri.scheme}://${uri.authority}?${qs.stringify(rest)}`;
}
export function uriWithoutId(uri) {
    return uri.slice(0, uri.lastIndexOf(':'));
}
export function extractId(id) {
    const count = parseInt(id.slice(id.lastIndexOf(':') + 1));
    return count;
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
    const schemaName = `${input.column.reference.model_name}ResourceSchema`;
    const query = {
        schemaName,
        displayName: input.column.reference.display_name,
        filterModel: {
            [input.column.reference.primary_key]: {
                filterType: 'number',
                type: 'equals',
                filter: id,
            },
        }
    };
    const retUri = `grid://${uri.authority}?${qs.stringify(query)}`;
    return new URI(retUri);
}
export function getUriFilterModel(uri) {
    if (typeof uri === 'string') {
        uri = new URI(uri);
    }
    const query = qs.parse(uri.query);
    const ret = qs.parse(query['filterModel']);
    return _.mapValues(ret, (v) => {
        if (v.filterType === 'number')
            v.filter = Number(v.filter);
        return v;
    });
}
export function mergeUriFilterModel(uri, filterModel) {
    const origFilterModel = getUriFilterModel(uri);
    const ret = Object.assign(Object.assign({}, origFilterModel), filterModel);
    const ret2 = Object.keys(ret).reduce((acc, k) => {
        if (filterModel[k] === undefined) {
            return acc;
        }
        const v = ret[k];
        if (v.filterType === 'number')
            v.filter = Number(v.filter);
        acc[k] = v;
        return acc;
    }, {});
    return ret2;
}
export function updateUriFilterModel(uri, filterModel) {
    if (typeof uri === 'string') {
        uri = new URI(uri);
    }
    const query = qs.parse(uri.query);
    const query2 = Object.assign(Object.assign({}, query), { filterModel });
    const ret = uri.withQuery(qs.stringify(query2));
    return ret;
}
export function isUriLikeEqual(a, b) {
    if (typeof a === 'string')
        a = new URI(a);
    if (typeof b === 'string')
        b = new URI(b);
    return a.scheme === b.scheme
        && a.authority === b.authority
        && a.path.toString() === b.path.toString()
        && _.isEqual(qs.parse(a.query), qs.parse(b.query))
        && a.fragment === b.fragment;
}
export function isUriAsKeyLikeEqual(a, b) {
    if (typeof a === 'string')
        a = new URI(a);
    if (typeof b === 'string')
        b = new URI(b);
    return a.scheme === b.scheme
        && a.authority === b.authority
        && a.path.toString() === b.path.toString()
        && _.isEqual(qs.parse(a.query), qs.parse(b.query))
        && a.fragment === b.fragment;
}
//# sourceMappingURL=uri-utils.js.map