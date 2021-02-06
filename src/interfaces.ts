export enum ChatSizeTypes {
  small = "small",
  normal = "normal",
  large = "large",
}

export interface IChannel {
  id: number
  name: string
  messages: []
}

export interface IDataMessage {
  id: string
  from: string
  text: string
  createdAt: string
}

export interface IMessage {
  from: string
  text: string
}
