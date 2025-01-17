import { injectable } from '@theia/core/shared/inversify'
import { ColorContribution } from '@theia/core/lib/browser/color-application-contribution'
import { ColorRegistry } from '@theia/core/lib/browser/color-registry'

@injectable()
export class SampleColorContribution implements ColorContribution {
  registerColors(colors: ColorRegistry): void {
    colors.register(
      {
        id: 'activityBar.border',
        defaults: {
          dark: '#292b38',
          light: '#e0e0e0',
          hcDark: 'contrastBorder',
          hcLight: 'contrastBorder',
        },
        description: 'Activity bar border color separating to the side bar. The activity bar is showing on the far left or right and allows to switch between views of the side bar.',
      },
      {
        id: 'titleBar.border', defaults: {
          dark: '#292b38',
          light: '#e0e0e0',
          hcDark: 'contrastBorder',
          hcLight: 'contrastBorder',
        }, description: 'Title bar border color. Note that this color is currently only supported on macOS.',
      },
      {
        id: 'statusBar.border',
        defaults: {
          dark: '#292b38',
          light: '#e0e0e0',
          hcDark: 'contrastBorder',
          hcLight: 'contrastBorder',
        },
        description: 'Status bar border color separating to the sidebar and editor. The status bar is shown in the bottom of the window.',
      },
    )
  }
}
