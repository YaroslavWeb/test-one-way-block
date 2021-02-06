import { IDataMessage, ChatSizeTypes } from "interfaces"

type rootState = {
  name: string
  socketId: string | null
  isConnected: boolean
  chat: {
    size: ChatSizeTypes
    messages: IDataMessage[]
  }
}

export const state: rootState = {
  name: "Yaroslav",
  isConnected: false,
  socketId: null,

  chat: {
    size: ChatSizeTypes.normal,
    messages: [],
  },
}
