import { FrontendApplicationContribution } from '@theia/core/lib/browser'
import { inject, injectable } from '@theia/core/shared/inversify'
import { LoginModelSymbol, ThemeModelSymbol } from '@flowda/types'
import { LoginModel, ThemeModel } from '@flowda/design'
import { MessageService } from '@theia/core'
import { CreateTRPCProxyClient } from '@trpc/client'
import { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { ThemeService } from '@theia/core/lib/browser/theming'
import { ThemeType } from '@theia/core/lib/common/theme'

@injectable()
export class HelloFrontendContribution implements FrontendApplicationContribution {
  @inject(LoginModelSymbol) protected login: LoginModel
  @inject(ThemeModelSymbol) protected theme: ThemeModel
  @inject(MessageService) protected messageService: MessageService
  @inject(ThemeService) protected themeService: ThemeService
  @inject('trpcFactory') protected trpcFactory: () => CreateTRPCProxyClient<AppRouter>

  initialize(): void {
    this.login.handlers.info = this.messageService.info.bind(this.messageService)
    this.login.handlers.validate = this.trpcFactory().hello.validate.mutate

    if (this.themeService.getCurrentTheme().id === 'linear-light'
      || this.themeService.getCurrentTheme().id === 'linear-magic-blue') {
      // 在 body 增加全局命名空间，在 style/*.css 里，如果是样式覆盖都套上 .flowda
      document.body.classList.add('flowda')
      document.documentElement.style.setProperty('--theia-quickInput-rowHeight', '44px')
    } else {
      document.documentElement.style.setProperty('--theia-quickInput-rowHeight', '22px')
    }

    if (this.themeService.getCurrentTheme().type === 'light' || this.themeService.getCurrentTheme().type === 'hcLight') {
      document.body.classList.add('ag-theme-quartz')
      this.theme.setColorMode('light')
    } else {
      document.body.classList.add('ag-theme-quartz-dark')
      this.theme.setColorMode('dark')
    }
    addOrUpdateEuiLinkTag(this.themeService.getCurrentTheme().type)

    this.themeService.onDidColorThemeChange((evt) => {
      if (evt?.oldTheme?.type) {
        if (evt.oldTheme.type === 'light' || evt.oldTheme.type === 'hcLight') {
          document.body.classList.remove('ag-theme-quartz')
        } else {
          document.body.classList.remove('ag-theme-quartz-dark')
        }
      }

      if (evt.newTheme.type === 'light' || evt.newTheme.type === 'hcLight') {
        document.body.classList.add('ag-theme-quartz')
        this.theme.setColorMode('light')
      } else {
        document.body.classList.add('ag-theme-quartz-dark')
        this.theme.setColorMode('dark')
      }
      addOrUpdateEuiLinkTag(evt.newTheme.type)

      if (evt.newTheme.id === 'linear-light' || evt.newTheme.id === 'linear-magic-blue') {
        document.body.classList.add('flowda')
        handleThemeChange(44)
      } else {
        document.body.classList.remove('flowda')
        handleThemeChange(22)
      }
    })
  }
}

const Eui_Link_Tag_Id = 'eui'

function addOrUpdateEuiLinkTag(type: ThemeType) {
  let ele: HTMLLinkElement | null = document.getElementById(Eui_Link_Tag_Id) as HTMLLinkElement | null
  if (ele == null) {
    ele = document.createElement('link')
    ele.id = Eui_Link_Tag_Id
    ele.rel = 'stylesheet'
    ele.href = type === 'light' || type === 'hcLight' ?
      'https://assets-1306445775.cos.ap-shanghai.myqcloud.com/eui/eui_theme_light.css' :
      'https://assets-1306445775.cos.ap-shanghai.myqcloud.com/eui/eui_theme_dark.css'
    document.head.appendChild(ele)
  } else {
    ele.href = type === 'light' || type === 'hcLight' ?
      'https://assets-1306445775.cos.ap-shanghai.myqcloud.com/eui/eui_theme_light.css' :
      'https://assets-1306445775.cos.ap-shanghai.myqcloud.com/eui/eui_theme_dark.css'
  }
  ele.setAttribute('eui-theme', type)
}

function handleThemeChange(height: number) {
  document.documentElement.style.setProperty('--theia-quickInput-rowHeight', `${height}px`)
  const rowEles = document.querySelectorAll<HTMLElement>('.monaco-list-row')
  rowEles.forEach((e, i) => {
    e.style.top = `${height * i}px`
    e.style.height = `${height}px`
  })
  document.querySelector<HTMLElement>('.monaco-list-rows')!.style.height = `${rowEles.length * height}px`
  document.getElementById('quickInput_list')!.style.maxHeight = `${rowEles.length * height}px`
}
