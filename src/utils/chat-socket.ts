import SocketIOClient from "socket.io-client"

import Api from "./api"
import { IMessage } from "interfaces"

type IOSocket = SocketIOClient.Socket

export default class ChatSocket {
  private static socket: IOSocket

  public static connect() {
    const socket = (ChatSocket.socket = SocketIOClient.connect(
      "wss://test-task-chat-4tmzp.ondigitalocean.app",
      {
        transports: ["websocket"],
        upgrade: false,
      }
    ) as IOSocket)

    // сообщение о соединении
    socket.on("connect", () => {
      console.log("ChatSocket connected")
    })

    return socket
  }

  //  отправляем сообщение через сокет
  public static sendMessage(message: IMessage) {
    console.log("ОТПРАВИЛИ СООБЩЕНИЕ", message)

    this.socket?.emit("message", message, (err: any) => {
      if (err) {
        console.log("sendMessage error", err)
      } else {
        console.log("send Message success")
      }
    })
  }

  // получаем историю сообщений
  public static async fetchMessages(skip: number, limit: number) {
    const messages = (await Api.getChatMessages(skip, limit))?.data
    return messages
  }

  // отписываемся от слушателей
  public static removeAllListeners() {
    try {
      console.log("removeAllListeners")
      return ChatSocket.socket.removeAllListeners()
    } catch (e) {
      console.log("removeAllListeners error", e)
    }
  }

  // закрываем сокет
  public static closeSocket(): void {
    console.log("closeSocket")
    ChatSocket.socket.close()
  }

  public static on(event: string, fn: Function) {
    try {
      return ChatSocket.socket.on(event, fn)
    } catch (e) {
      console.log("error")
    }
  }
}
