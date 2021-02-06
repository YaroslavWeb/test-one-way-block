import { useEffect, useRef, useState } from "react"
import { block } from "bem-cn"
import moment from "moment"

import { useOvermind } from "store"
import { ChatSizeTypes, IDataMessage } from "interfaces"
import { ReactComponent as AdaIcon } from "assets/svg/ADA.svg"
import { ReactComponent as BtcIcon } from "assets/svg/BTC.svg"
import { ReactComponent as AdminIcon } from "assets/svg/admin.svg"
import { ReactComponent as ModeratorIcon } from "assets/svg/moderator.svg"

import "./styles.scss"

const className = block("message-list")

export function MessageList() {
  const { state, reaction } = useOvermind()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() =>
    reaction(
      ({ chat }) => chat.messages,
      (messages) => {
        listRef.current?.scrollTo({
          top: messages.length * 100000,
          behavior: "smooth",
        })
      }
    )
  )

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  return (
    <div
      className={className({ small: state.chat.size === ChatSizeTypes.small })}
      ref={listRef}
    >
      {state.chat.messages.map((message: IDataMessage, idx) => (
        <div
          key={message.id}
          className={className("message", {
            personal: message.from === state.name,
          })}
        >
          <div className={className("message-form")}>
            {message.from !== state.name && (
              <div className={className("message-chars")}>
                {idx % 3 === 2 ? (
                  <AdaIcon />
                ) : idx % 2 === 1 ? (
                  <BtcIcon />
                ) : null}
                <span className={className("message-author")}>
                  {message.from}
                </span>
                <span>
                  {idx % 3 === 2 ? (
                    <AdminIcon />
                  ) : idx % 2 === 1 ? (
                    <ModeratorIcon />
                  ) : null}
                </span>
                <span className={className("message-lvl")}>
                  {Math.ceil(Math.random() * 10)}
                </span>
              </div>
            )}
            <div className={className("message-text")}>{message.text}</div>
          </div>

          <div className={className("message-date")}>
            {moment(message.createdAt).format("HH:mm")}
          </div>
        </div>
      ))}
    </div>
  )
}
