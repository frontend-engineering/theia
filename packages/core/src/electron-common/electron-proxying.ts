// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
// *****************************************************************************

import { createIpcNamespace } from './electron-ipc';

export interface Create {
    proxyId: string
    requestId: number
    params?: unknown[]
}

export interface Notification {
    method: string
    params: unknown[]
}

export interface Request {
    requestId: number
    method: string
    params: unknown[]
}

export interface RequestSync {
    method: string
    params: unknown[]
}

export interface Response {
    requestId: number
    error?: Error
    result?: unknown
}

export interface Cancel {
    requestId: number
}

export const ELECTRON_PROXYING_IPC = createIpcNamespace('theia-electron-proxying', channel => ({
    create: channel<(message: Create) => void>(),
    notification: channel<(message: Notification) => void>(),
    request: channel<(message: Request) => void>(),
    requestSync: channel<(message: RequestSync) => void>(),
    response: channel<(message: Response) => void>(),
    cancel: channel<(message: Cancel) => void>()
}));
