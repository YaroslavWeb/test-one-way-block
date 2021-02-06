import React, { useState, useRef } from "react"
import { block } from "bem-cn"

import { TabBarItem } from "./components/TabBarItem"
import { ReactComponent as ArrowIcon } from "assets/svg/arrow.svg"
import { IChannel } from "interfaces"

import "./styles.scss"

const className = block("tab-bar")

interface TabBarProps {
  tabs: IChannel[]
}

export function TabBar({ tabs }: TabBarProps) {
  const tabsRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(tabs[0].id)

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

  return (
    <div className={className()}>
      <div
        className={className("arrow", { left: true })}
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
        className={className("arrow", { right: true })}
        onClick={() => {
          scrollTo(false)
        }}
      >
        <ArrowIcon />
      </div>
    </div>
  )
}
