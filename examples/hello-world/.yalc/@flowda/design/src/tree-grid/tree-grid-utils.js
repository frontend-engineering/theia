import { __rest } from "tslib";
import { cloneDeep } from 'lodash';
export function convertMenuDataToAgTreeData(menuData) {
    const ret = [];
    menuData.forEach(tree => {
        traverse(tree, item => {
            const { parent, children } = item, rest = __rest(item, ["parent", "children"]);
            const hierarchy = traverseUp(item, node => node.id);
            ret.push(Object.assign({ hierarchy: hierarchy }, rest));
        });
    });
    return ret;
}
export function traverse(tree, visit) {
    var _a;
    visit(tree);
    if (tree.children && Array.isArray(tree.children) && tree.children.length > 0) {
        (_a = tree.children) === null || _a === void 0 ? void 0 : _a.forEach(child => {
            child.parent = tree;
            traverse(child, visit);
        });
    }
}
export function traverseUp(tree, visit) {
    const ret = [];
    ret.push(visit(tree));
    let parent = tree.parent;
    while (parent) {
        ret.unshift(visit(parent));
        parent = parent.parent;
    }
    return ret;
}
export function convertAgTreeDataToTreeData(input) {
    input = cloneDeep(input);
    const rootNodes = [];
    const nodeMap = {};
    input.forEach((node) => {
        node.children = [];
        nodeMap[node.id] = node;
    });
    input.forEach((node) => {
        const { hierarchy } = node, rest = __rest(node, ["hierarchy"]);
        const parentNode = hierarchy.length > 1 ? nodeMap[hierarchy[hierarchy.length - 2]] : null;
        if (parentNode) {
            if (parentNode.children == null)
                parentNode.children = [];
            parentNode.children.push(node);
        }
        else {
            rootNodes.push(node);
        }
    });
    return JSON.parse(stringifyMenuData(rootNodes));
}
export function stringifyMenuData(input) {
    return JSON.stringify(input, (k, value) => {
        if (value.hierarchy)
            delete value.hierarchy;
        if (value.children && value.children.length === 0)
            delete value.children;
        return value;
    });
}
//# sourceMappingURL=tree-grid-utils.js.map