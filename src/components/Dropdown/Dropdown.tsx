import invariant from 'tiny-invariant'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { type IFilter, type IFilterOption } from '@/models/base'

import styles from './Dropdown.module.css'
import lightArrow from './arrow-down-light.svg'
import darkArrow from './arrow-down-dark.svg'
import { DropdownMenu } from '../DropdownMenu'

export interface DropdownProps {
  onSelect: (filter: IFilter) => void
  filter: IFilter
  size?: 'sm'
}

export function Dropdown({ onSelect, filter, size }: DropdownProps) {
  const { value, options } = filter
  const dropDownRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  const onChange = (newOption: IFilterOption) => {
    const value = newOption.value
    onSelect({ ...filter, value })
    setShow(false)
  }
  const toggleDropdown = () => {
    const nextState = !show
    if (nextState) {
      const div = dropDownRef.current
      invariant(div, 'can not find the div in the dom tree')
      const rect = div.getBoundingClientRect()
      setTop(rect.top + rect.height)
      setLeft(rect.left)
    }
    setShow(nextState)
  }

  let selectedOption = options.find((opt) => opt.value === value)
  if (!selectedOption) {
    selectedOption = options.find((opt) => opt.value === 'all') as IFilterOption
  }
  const classes = classNames(styles.dropdown, {
    [styles.active]: value !== 'all',
    [styles.sm]: size === 'sm',
  })
  return (
    <div className={styles.dropdownContainer}>
      <div
        ref={dropDownRef}
        className={classes}
        onClick={toggleDropdown}>
        <span>{selectedOption.label}</span>
        <DropDownArrow
          color={selectedOption.value === 'all' ? 'dark' : 'light'}
        />
      </div>
      {show &&
        createPortal(
          <DropdownMenu
            style={{ left: left + 'px', top: top + 'px' }}
            options={options}
            size={size}
            onSelect={onChange}
          />,
          document.body
        )}
    </div>
  )
}

interface DropDownArrowProps {
  color: 'dark' | 'light'
}
function DropDownArrow({ color }: DropDownArrowProps) {
  const svg = color === 'dark' ? darkArrow : lightArrow
  return (
    <div className={styles.dropdownArrow}>
      <img
        className={styles.dropdownArrowUp}
        src={browser.runtime.getURL(svg)}
      />
      <img
        className={styles.dropdownArrowDown}
        src={browser.runtime.getURL(svg)}
      />
    </div>
  )
}
