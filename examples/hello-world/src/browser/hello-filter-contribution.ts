import { injectable } from '@theia/core/shared/inversify'
import { ContributionFilterRegistry, FilterContribution } from '@theia/core'

/**
 * 后续会禁用一些 Editor 相关的绑定
 * 现在开发阶段先都打开，因为现在策略是尽量复用（通过覆写一些底层的获取数据的接口）
 */
@injectable()
export class HelloFilterContribution implements FilterContribution {
    registerContributionFilters(registry: ContributionFilterRegistry): void {
        registry.addFilters('*', [
            // filter a contribution based on its class type
            contrib =>
                // // if (contrib.constructor.name.indexOf('Monaco') > -1) return false;
                // if (contrib.constructor.name.indexOf('EditorCommandContribution') > -1) return false;
                // if (contrib.constructor.name.indexOf('EditorMenuContribution') > -1) return false;
                // if (contrib.constructor.name.indexOf('WorkspaceSymbolCommand') > -1) return false;
                // if (contrib.constructor.name.indexOf('OutlineViewService') > -1) return false;
                // if (contrib.constructor.name.indexOf('OutlineViewContribution') > -1) return false;
                // console.log('contrib.constructor', contrib.constructor.name)
                // return !(contrib instanceof SampleCommandContribution);
                true,

        ])
    }
}
