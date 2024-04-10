/*
import { injectable } from '@theia/core/shared/inversify'
import { WebSocketConnectionSource } from '@theia/core/lib/browser/messaging/ws-connection-source'
import SocketMock from 'socket.io-mock'

@injectable()
export class HelloWsConnectionSource extends WebSocketConnectionSource {
  override createWebSocket(url: string) {
    const socket = new SocketMock()
    socket.connect = function () {
      console.log('socket.io-mock#connect')
    }
    socket.close = function () {
      console.log('socket.io-mock#close')
    }
    return socket
  }
}
*/
