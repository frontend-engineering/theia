import { MonacoQuickInputImplementation } from '@theia/monaco/lib/browser/monaco-quick-input-service'
import { inject, injectable } from '@theia/core/shared/inversify'
import { IQuickInputOptions } from '@theia/monaco-editor-core/esm/vs/base/parts/quickinput/browser/quickInput'
import { ThemeService } from '@theia/core/lib/browser/theming'

// node_modules/@theia/monaco-editor-core/src/vs/base/parts/quickinput/browser/quickInputList.ts
@injectable()
export class ListElementDelegate {
  constructor(@inject(ThemeService) private themeService: ThemeService) {
  }

  getHeight(element: any) {
    if (this.themeService.getCurrentTheme().id === 'linear-light' || this.themeService.getCurrentTheme().id === 'linear-magic-blue') {
      return 44
    } else {
      return element.saneDetail ? 44 : 22
    }
  }

  getTemplateId(element: any) {
    return 'listelement'
  }
}

@injectable()
export class HelloMonacoQuickInputService extends MonacoQuickInputImplementation {
  constructor(@inject('Factory<ListElementDelegate>') private delegateFactory: () => ListElementDelegate) {
    super(
    )
  }

  override getOptions(): IQuickInputOptions {
    let options = super.getOptions()
    options = {
      ...options,
      // @ts-ignore
      delegate: this.delegateFactory(),
    }
    return options
  }

}
