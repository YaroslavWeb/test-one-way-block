import { useEffect } from "react"
import { block } from "bem-cn"
import ChatSocket from "utils/chat-socket"

import { Header } from "./components/Header"
import { MessageList } from "./components/MessageList"
import { FormMessage } from "./components/FormMessage"
import { useOvermind } from "store"
import { ChatSizeTypes, IDataMessage } from "interfaces"

import "./styles.scss"

const className = block("chat")

export function Chat() {
  const { state, actions } = useOvermind()

  useEffect(() => {
    actions.getConnect()
    ChatSocket.on("message", (message: IDataMessage) => {
      actions.getMessage(message)
      console.log("ПОЛУЧИЛИ СООБЩЕНИЕ ОТ ПОЛЬЗОВАТЕЛЯ", message)
    })
  }, [])

  return (
    <div
      className={className({ small: state.chat.size === ChatSizeTypes.small })}
    >
      <Header />
      <MessageList />
      <FormMessage />
    </div>
  )
}
