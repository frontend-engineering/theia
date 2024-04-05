import { injectable, postConstruct } from '@theia/core/shared/inversify'
import { ThemeServiceWithDB } from '@theia/monaco/lib/browser/monaco-indexed-db'

@injectable()
export class HelloThemeService extends ThemeServiceWithDB {
  @postConstruct()
  override init(): void {
    this.register({
      id: 'linear-magic-blue',
      type: 'dark',
      label: 'Magic Blue',
      editorTheme: 'linear-magic-blue',
    })
    this.register({
      id: 'linear-light',
      type: 'light',
      label: 'Linear Light',
      editorTheme: 'linear-light',
    })
    super.init()
    // delete this.themes['dark']
    delete this.themes['light']
    delete this.themes['hc-theia']
    delete this.themes['hc-theia-light']
  }
}
