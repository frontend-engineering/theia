import * as React from '@theia/core/shared/react'
import { TaskForm, type TaskFormModel } from '@flowda/design'
import { ManageableWidget } from './manageable-widget'

export class TaskFormWidget extends ManageableWidget {
    static readonly ID = 'task-from-widget'

    constructor(private option: { id: string; uri: string, title: string, model: TaskFormModel }) {
        super()
        this.id = option.id
        this.uri = option.uri
        this.title.caption = option.title
        this.title.label = option.title
        this.title.iconClass = 'unclosable-window-icon'
        this.title.closable = true
        this.update()
    }

    protected render(): React.ReactNode {
        return <TaskForm model={this.option.model} />
    }
}
