import { IMessage, IDataMessage, ChatSizeTypes } from "interfaces"
import { Action, AsyncAction } from "overmind"

import ChatSocket from "utils/chat-socket"

export const changeSizeChat: Action<ChatSizeTypes> = ({ state }, size) => {
  state.chat.size = size
}

export const getConnect: AsyncAction = async ({ state }) => {
  const socket = ChatSocket.connect()
  const messages = await ChatSocket.fetchMessages(0, 10)
  if (socket) {
    state.isConnected = true
    state.socketId = socket.id
  } else {
    state.isConnected = false
    state.socketId = null
  }

  if (messages) {
    state.chat.messages = messages.reverse()
  }
}

export const sendMessage: Action<string> = ({ state }, text) => {
  const newMessage: IMessage = {
    from: state.name,
    text: text.trim(),
  }

  const today = new Date().toISOString()

  const newDataMessage: IDataMessage = {
    ...newMessage,
    id: String(Date.now()),
    createdAt: today,
  }

  state.chat.messages.push(newDataMessage)
  ChatSocket.sendMessage(newMessage)
}

export const getMessage: Action<IDataMessage> = ({ state }, message) => {
  console.log("getMessage", message)

  state.chat.messages.push(message)
}

export const getPreviousMessages: AsyncAction = async ({ state }) => {
  const messages = await ChatSocket.fetchMessages(state.chat.messages.length, 5)

  state.chat.messages.unshift(...messages.reverse())
}
