import { interfaces } from 'inversify';
import { ManageableModel, WidgetOption } from '@flowda/types';
import { ReactWidget } from '@theia/core/lib/browser';
import * as React from 'react';
import { GridModel } from '@flowda/design';
import { URI } from '@theia/core';

declare const bindTheiaModule: (bind: interfaces.Bind) => void;

declare abstract class ManageableWidget extends ReactWidget {
    uri?: string;
    model?: ManageableModel;
}

declare function registerManageableFactory<WIDGET extends ManageableWidget, MODEL extends ManageableModel>(bind: interfaces.Bind | interfaces.Rebind, name: string, Model: interfaces.Newable<MODEL>, Widget: interfaces.Newable<WIDGET>): void;

declare class GridWidget extends ManageableWidget {
    model?: GridModel | undefined;
    static readonly ID = "grid-widget";
    constructor(model?: GridModel | undefined);
    protected render(): React.ReactNode;
}

declare class ManageableService {
    private modelFactory;
    private widgetAbstractFactory;
    private manageableModelMap;
    constructor(modelFactory: (named: string) => ManageableModel, widgetAbstractFactory: (named: string) => (options: WidgetOption<ManageableModel>) => ManageableWidget);
    getOrCreateGridModel<T>(uri: URI | string): ManageableModel;
    removeModel(uri: URI | string): void;
    createWidget(options: {
        uri: string;
        counter: number | undefined;
    }): ManageableWidget;
}

export { GridWidget, ManageableService, ManageableWidget, bindTheiaModule, registerManageableFactory };
