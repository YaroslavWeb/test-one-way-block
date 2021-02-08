import { useState } from "react"
import { block } from "bem-cn"
import { ChatSizeTypes } from "interfaces"
import { useOvermind } from "store"

import { ReactComponent as SendIcon } from "assets/svg/send.svg"
import EmojiImage from "assets/images/emoji.png"

import "./styles.scss"

const className = block("form-message")

export function FormMessage() {
  const { state, actions } = useOvermind()
  const [textInput, setTextInput] = useState("")

  const handleClick = () => {
    setTextInput("")
    actions.sendMessage(textInput)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTextInput("")
      actions.sendMessage(textInput)
    }
  }

  return (
    <div
      className={className({ small: state.chat.size === ChatSizeTypes.small })}
    >
      <input
        className={className("custom-input")}
        placeholder="Напишите сообщение"
        onKeyPress={handleKeyPress}
        maxLength={200}
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.currentTarget.value)}
      />
      <div className={className("actions")}>
        {textInput.trim() && (
          <div className={className("send-icon")} onClick={handleClick}>
            <SendIcon />
          </div>
        )}
        <div className={className("emoji-icon")}>
          <img src={EmojiImage} alt="emoji" />
        </div>
      </div>
    </div>
  )
}
