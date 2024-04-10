import { __rest } from "tslib";
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
//# sourceMappingURL=tree-grid-utils.js.map