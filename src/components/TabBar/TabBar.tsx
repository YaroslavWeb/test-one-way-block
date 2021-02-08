import React, { useState, useRef, useEffect } from "react"
import { block } from "bem-cn"

import { useOvermind } from "store"
import { TabBarItem } from "./components/TabBarItem"
import { ReactComponent as ArrowIcon } from "assets/svg/arrow.svg"
import { ChatSizeTypes, IChannel } from "interfaces"

import "./styles.scss"

const className = block("tab-bar")

interface TabBarProps {
  tabs: IChannel[]
}

export function TabBar({ tabs }: TabBarProps) {
  const { state } = useOvermind()
  const tabsRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [isLeftArrow, setLeftArrow] = useState(false)
  const [isRightArrow, setRightArrow] = useState(true)

  const toggleActiveTab = (id: number) => {
    setActiveTab(id)
  }

  const scrollTo = (toRight: boolean) => {
    tabsRef.current?.scrollTo({
      left: toRight
        ? -tabsRef.current.scrollWidth
        : tabsRef.current.scrollWidth,
      behavior: "smooth",
    })
  }

  const handleScroll = () => {
    if (tabsRef.current) {
      console.log(tabsRef.current.scrollLeft)
      if (tabsRef.current.scrollLeft === 0) {
        setRightArrow(true)
        setLeftArrow(false)
      } else {
        setLeftArrow(true)
        setRightArrow(false)
      }
    }
  }

  useEffect(() => {
    tabsRef.current?.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (state.chat.size === ChatSizeTypes.large) {
      setRightArrow(false)
      setLeftArrow(false)
    } else {
      handleScroll()
    }
  }, [state.chat.size])

  return (
    <div className={className()}>
      <div
        className={className("arrow", { left: true, hidden: !isLeftArrow })}
        onClick={() => {
          scrollTo(true)
        }}
      >
        <ArrowIcon />
      </div>
      <div className={className("tabs")} ref={tabsRef}>
        {tabs.map((item) => (
          <TabBarItem
            key={item.id + item.name}
            id={item.id}
            label={item.name}
            isActive={activeTab === item.id}
            handleClick={(id) => toggleActiveTab(id)}
          />
        ))}
      </div>
      <div
        className={className("arrow", { right: true, hidden: !isRightArrow })}
        onClick={() => {
          scrollTo(false)
        }}
      >
        <ArrowIcon />
      </div>
    </div>
  )
}
