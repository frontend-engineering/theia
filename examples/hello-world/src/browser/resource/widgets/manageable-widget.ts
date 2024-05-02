import { injectable } from '@theia/core/shared/inversify'
import { ReactWidget } from '@theia/core/lib/browser'

@injectable()
export abstract class ManageableWidget extends ReactWidget {
  uri: string
}
