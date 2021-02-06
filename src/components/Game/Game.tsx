import { block } from "bem-cn"

import GameImage from "assets/images/game.png"

import "./styles.scss"

const className = block("game")

export function Game() {
  return (
    <div className={className()}>
      <img src={GameImage} alt="game" />
    </div>
  )
}
