import * as React from 'react'

import css from './DropDown.module.css'

interface IDropDown {
  options: { label: string; value: string }[]
  value: string
  onSelect: (v: string) => void
  isActive: boolean
}

const DropDown = ({ options, onSelect, value, isActive }: IDropDown) => {
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value
    onSelect(value)
  }
  return (
    <select
      value={value}
      onChange={onChange}
      className={`${css.dropdown} ${css.sm} ${isActive ? '' : css.inactive}`}>
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export default DropDown
