import { block } from "bem-cn"

import "./styles.scss"

const className = block("tab-bar-item")

interface TabBarItemProps {
  label: string
  isActive: boolean
  handleClick: (id: number) => void
  id: number
}

export function TabBarItem({
  label,
  isActive,
  handleClick,
  id,
}: TabBarItemProps) {
  return (
    <div
      className={className({ active: isActive })}
      onClick={() => handleClick(id)}
    >
      <span>{label}</span>

      <span className={className("line", { active: isActive })} />
    </div>
  )
}
