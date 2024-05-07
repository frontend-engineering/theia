import { ManageableModelSymbol, ManageableWidgetSymbol, } from '@flowda/types';
export function registerManageableFactory(bind, name, Model, Widget) {
    bind(ManageableModelSymbol).to(Model).inRequestScope().whenTargetNamed(name);
    bind(ManageableWidgetSymbol).to(Widget).inRequestScope().whenTargetNamed(name);
}
//# sourceMappingURL=ioc-utils.js.map