import { injectable, postConstruct } from 'inversify'
import { ThemeServiceWithDB } from '@theia/monaco/lib/browser/monaco-indexed-db'

@injectable()
export class HelloThemeService extends ThemeServiceWithDB {
  @postConstruct()
  override init(): void {
    this.register({
      id: 'linear-dark',
      type: 'dark',
      label: 'Dark (Linear)',
      editorTheme: 'dark-theia', // loaded in /packages/monaco/src/browser/textmate/monaco-theme-registry.ts
    })
    super.init()
  }
}
