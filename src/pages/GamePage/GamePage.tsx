import { block } from "bem-cn"

import { Chat } from "components/Chat"
import { Game } from "components/Game"
import { ChatSizeTypes } from "interfaces"
import { useOvermind } from "store"

import "./styles.scss"

const className = block("game-page")

export function GamePage() {
  const { state } = useOvermind()
  return (
    <div className={className()}>
      <Game />
      <div
        className={className("gui", {
          full: state.chat.size === ChatSizeTypes.large,
        })}
      >
        <Chat />
      </div>
    </div>
  )
}
