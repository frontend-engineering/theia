import * as _ from 'radash';
export function getFormItemColumns(schema) {
    return schema.columns.filter(col => {
        var _a;
        if ((schema === null || schema === void 0 ? void 0 : schema.primary_key) === col.name)
            return false;
        if (!col.visible)
            return false;
        if (col.column_type === 'reference' && ((_a = col.reference) === null || _a === void 0 ? void 0 : _a.reference_type) === 'has_one')
            return false;
        return col.access_type !== 'read_only';
    });
}
/**
 * suppress warning: uncontrolled input to be controlled
 */
export function getDefaultInitialValues(schema) {
    if (schema == null)
        return {};
    const ret = getFormItemColumns(schema);
    return _.objectify(ret, i => i.name, i => '');
}
//# sourceMappingURL=new-form-utils.js.map