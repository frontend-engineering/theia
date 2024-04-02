import { MonacoThemeRegistry } from '@theia/monaco/lib/browser/textmate/monaco-theme-registry'
import { injectable } from '@theia/core/shared/inversify'

@injectable()
export class HelloMonacoThemeRegistry extends MonacoThemeRegistry {
  override initializeDefaultThemes() {
    super.initializeDefaultThemes()
    this.register(require('../../../data/monaco-themes/vscode/linear_magic_blue.json'), {
      './dark_vs.json': require('@theia/monaco/data/monaco-themes/vscode/dark_vs.json'),
      './dark_plus.json': require('@theia/monaco/data/monaco-themes/vscode/dark_plus.json'),
    }, 'linear-magic-blue', 'vs-dark')
    this.register(require('../../../data/monaco-themes/vscode/linear_light.json'), {
      './light_vs.json': require('@theia/monaco/data/monaco-themes/vscode/light_vs.json'),
      './light_plus.json': require('@theia/monaco/data/monaco-themes/vscode/light_plus.json'),
    }, 'linear-light', 'vs')
  }
}
