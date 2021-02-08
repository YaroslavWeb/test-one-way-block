import { useState, useEffect } from "react"
import { block } from "bem-cn"

import { useOvermind } from "store"
import { TabBar } from "components/TabBar"
import { IChannel, ChatSizeTypes } from "interfaces"
import { ReactComponent as ArrowIcon } from "assets/svg/arrow.svg"
import { ReactComponent as FullIcon } from "assets/svg/large.svg"
import { ReactComponent as HideIcon } from "assets/svg/minimize.svg"

import "./styles.scss"

const className = block("header-chat")

const languges = ["RU", "EN", "ZHO"]
const channels: IChannel[] = [
  {
    id: 1,
    name: "Общий",
    messages: [],
  },
  {
    id: 2,
    name: "Клан",
    messages: [],
  },
  {
    id: 3,
    name: "Друзья",
    messages: [],
  },
  {
    id: 4,
    name: "Новости",
    messages: [],
  },
]
export function Header() {
  const { state, actions } = useOvermind()

  const [language, setLanguage] = useState<string>("RU")
  const [isList, setList] = useState<boolean>(false)

  const toggleList = () => {
    if (state.chat.size !== ChatSizeTypes.small) setList((prev) => !prev)
  }
  const chooseLanguage = (value: string) => setLanguage(value)

  const handleHideChat = () => {
    if (state.chat.size === ChatSizeTypes.normal) {
      actions.changeSizeChat(ChatSizeTypes.small)
    } else if (state.chat.size === ChatSizeTypes.large) {
      actions.changeSizeChat(ChatSizeTypes.small)
    } else {
      actions.changeSizeChat(ChatSizeTypes.normal)
    }
  }

  const handleFullChat = () => {
    if (state.chat.size === ChatSizeTypes.normal) {
      actions.changeSizeChat(ChatSizeTypes.large)
    } else if (state.chat.size === ChatSizeTypes.small) {
      actions.changeSizeChat(ChatSizeTypes.large)
    } else {
      actions.changeSizeChat(ChatSizeTypes.normal)
    }
  }

  useEffect(() => {
    setList(false)
  }, [language])

  return (
    <div
      className={className({ small: state.chat.size === ChatSizeTypes.small })}
    >
      <TabBar tabs={channels} />

      <div className={className("actions")}>
        <div className={className("language-selecter")} onClick={toggleList}>
          <span className={className("language")}>{language}</span>
          <ArrowIcon />
          {isList && (
            <ul className={className("list")}>
              {languges.map((item, idx) => (
                <li key={item + idx} onClick={() => chooseLanguage(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={className("button")} onClick={handleHideChat}>
          <HideIcon />
        </div>
        <div style={{ marginRight: 10 }} />
        <div className={className("button")} onClick={handleFullChat}>
          <FullIcon />
        </div>
      </div>
    </div>
  )
}
