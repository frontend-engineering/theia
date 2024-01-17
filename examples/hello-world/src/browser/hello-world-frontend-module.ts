// tslint:disable:file-header
import { bindContribution, CommandContribution, FilterContribution } from '@theia/core'
import { ContainerModule, interfaces } from '@theia/core/shared/inversify'
import { ShellLayoutRestorer } from '@theia/core/lib/browser'
import { HelloShellLayoutRestorer } from './hello-shell-layout-restorer'
import { HelloFilterContribution } from './hello-filter-contribution'
import { SampleCommandContribution } from './sample-command-contribution'

export default new ContainerModule((
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
) => {
    bind(CommandContribution).to(SampleCommandContribution).inSingletonScope()

    bind(HelloFilterContribution).toSelf().inSingletonScope()
    bindContribution(bind, HelloFilterContribution, [FilterContribution])

    rebind(ShellLayoutRestorer).to(HelloShellLayoutRestorer).inSingletonScope()
})
