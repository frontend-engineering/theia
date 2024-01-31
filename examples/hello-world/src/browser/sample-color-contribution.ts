import { injectable } from '@theia/core/shared/inversify'
import { ColorContribution } from '@theia/core/lib/browser/color-application-contribution'
import { ColorRegistry } from '@theia/core/lib/browser/color-registry'
import { Color } from '@theia/core/lib/common/color'

@injectable()
export class SampleColorContribution implements ColorContribution {
  registerColors(colors: ColorRegistry): void {

  }
}
