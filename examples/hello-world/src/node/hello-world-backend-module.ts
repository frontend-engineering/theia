// tslint:disable:file-header
import { ContainerModule, interfaces } from '@theia/core/shared/inversify'
import { HelloBackendApplicationContribution } from './hello-backend-application-contribution'
import { BackendApplicationContribution } from '@theia/core/lib/node'

export default new ContainerModule((
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
) => {
    bind(HelloBackendApplicationContribution).toSelf().inSingletonScope()
    bind(BackendApplicationContribution).toService(HelloBackendApplicationContribution)
})
