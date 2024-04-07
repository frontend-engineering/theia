import { GettingStartedContribution } from './getting-started-contribution'
import { interfaces } from '@theia/core/shared/inversify'
import { GettingStartedWidget } from './getting-started-widget'
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser'
import { bindGettingStartedPreferences } from './getting-started-preferences'

export function bindGettingStartedFrontendModule(bind: interfaces.Bind) {
  bindViewContribution(bind, GettingStartedContribution)
  bind(FrontendApplicationContribution).toService(GettingStartedContribution)
  bind(GettingStartedWidget).toSelf()
  bind(WidgetFactory).toDynamicValue(context => ({
    id: GettingStartedWidget.ID,
    createWidget: () => context.container.get<GettingStartedWidget>(GettingStartedWidget),
  })).inSingletonScope()
  bindGettingStartedPreferences(bind)
}
