import { injectable } from 'inversify'
import { ReactWidget } from '@theia/core/lib/browser'

@injectable()
export abstract class ManageableWidget extends ReactWidget {
  uri: string
}
