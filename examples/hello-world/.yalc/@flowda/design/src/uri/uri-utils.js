import { __rest } from "tslib";
import { newFormUriSchema, taskUriInputSchema, treeGridUriQuerySchema } from '@flowda/types';
import { URI } from '@theia/core';
import * as qs from 'qs';
import * as _ from 'radash';
export function getUriDisplayName(uri) {
    const query = qs.parse(uri.query);
    if (!('displayName' in query) || typeof query.displayName !== 'string')
        throw new Error(`query must have displayName and is string, ${uri.toString(true)}`);
    return query.displayName;
}
export function getUriSchemaName(uri) {
    const query = qs.parse(uri.query);
    if (!('schemaName' in query) || typeof query.schemaName !== 'string')
        throw new Error(`query must have schemaName and is string, ${uri.toString(true)}`);
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
export function convertTreeGridUriToGridUri(uri) {
    if (typeof uri === 'string')
        uri = new URI(uri);
    const query = getTreeUriQuery(uri);
    const displayName = query.displayName.split('#')[0];
    const gridUri = `grid://${uri.authority}?schemaName=${query.schemaName}&displayName=${displayName}`;
    return gridUri;
}
export function getTreeUriQuery(uri) {
    if (typeof uri === 'string')
        uri = new URI(uri);
    const query = qs.parse(uri.query);
    const queryParsedRet = treeGridUriQuerySchema.parse(query);
    return queryParsedRet;
}
export function createRefUri(input) {
    var _a, _b, _c, _d, _e;
    const uri = new URI(input.uri);
    if (((_a = input.column) === null || _a === void 0 ? void 0 : _a.column_type) !== 'reference')
        throw new Error(`column_type should be reference, ${(_b = input.column) === null || _b === void 0 ? void 0 : _b.name}, ${(_c = input.column) === null || _c === void 0 ? void 0 : _c.column_type}`);
    if (input.column.reference == null)
        throw new Error(`column_type reference should have reference, ${input.column.name}`);
    const id = (_e = (_d = input.cellRendererInput) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e[input.column.reference.primary_key];
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
        },
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
    return _.mapValues(ret, v => {
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
    const query3 = qs.stringify(query2, { encode: false });
    const ret = uri.withQuery(query3);
    return ret;
}
export function isUriLikeEqual(a, b) {
    if (typeof a === 'string')
        a = new URI(a);
    if (typeof b === 'string')
        b = new URI(b);
    return (a.scheme === b.scheme &&
        a.authority === b.authority &&
        a.path.toString() === b.path.toString() &&
        _.isEqual(qs.parse(a.query), qs.parse(b.query)) &&
        a.fragment === b.fragment);
}
export function isUriAsKeyLikeEqual(a, b) {
    if (typeof a === 'string')
        a = new URI(a);
    if (typeof b === 'string')
        b = new URI(b);
    return uriAsKey(a) === uriAsKey(b);
}
export function createAssociationUri(input) {
    var _a, _b, _c;
    if (((_a = input.association) === null || _a === void 0 ? void 0 : _a.model_name) == null)
        throw new Error('should be association');
    const uri = new URI(input.uri);
    const query = {
        schemaName: `${(_b = input.association) === null || _b === void 0 ? void 0 : _b.model_name}ResourceSchema`,
        displayName: input.association.display_name,
        filterModel: {
            [input.association.foreign_key]: {
                filterType: 'number',
                type: 'equals',
                // @ts-expect-error ag-grid
                filter: (_c = input.cellRendererInput.data) === null || _c === void 0 ? void 0 : _c[input.association.primary_key],
            },
        },
    };
    const ret = `${uri.scheme}://${uri.authority}?${qs.stringify(query, { encode: false })}`;
    return new URI(ret);
}
export function createTaskUri(input) {
    const uri = new URI(input.uri);
    const { id, taskDefinitionKey, name } = taskUriInputSchema.parse(input.cellRendererInput.data);
    const ret = `task://${uri.authority}?${qs.stringify({
        taskDefinitionKey,
        taskId: id,
        displayName: name,
    }, { encode: false })}`;
    return new URI(ret);
}
export function createNewFormUri(uri) {
    if (typeof uri === 'string') {
        uri = new URI(uri);
    }
    const query = newFormUriSchema.parse(qs.parse(uri.query));
    const ret = `new-form://${uri.authority}?${qs.stringify({
        schemaName: query.schemaName,
        displayName: '新增' + query.displayName,
    }, { encode: false })}`;
    return ret;
}
//# sourceMappingURL=uri-utils.js.map