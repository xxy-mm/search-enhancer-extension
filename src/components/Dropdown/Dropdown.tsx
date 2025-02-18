import invariant from 'tiny-invariant'
import { useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import {
  FILTER_OPTION_DEFAULT,
  type IFilter,
  type IFilterOption,
} from '@/models/base'
import deleteIcon from '@/assets/images/delete.svg'
import lightArrow from '@/assets/images/arrow-down-light.svg'
import darkArrow from '@/assets/images/arrow-down-dark.svg'

import styles from './Dropdown.module.css'
import { DropdownMenu } from '../DropdownMenu'

export interface DropdownProps {
  onSelect: (filter: IFilter) => void
  filter: IFilter
  size?: 'sm'
  disabled?: boolean
}

export function Dropdown({ onSelect, filter, size, disabled }: DropdownProps) {
  const { value, options } = filter
  const dropDownRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  const onChange = (newOption: IFilterOption) => {
    if (disabled) return
    const value = newOption.value
    onSelect({ ...filter, value })
    setShow(false)
  }

  const clear = (e: MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
    const value = FILTER_OPTION_DEFAULT
    onSelect({ ...filter, value })
    setShow(false)
  }
  const toggleDropdown = () => {
    if (disabled) return
    const nextState = !show
    if (nextState) {
      const div = dropDownRef.current
      invariant(div, 'can not find the div in the dom tree')
      const rect = div.getBoundingClientRect()
      setTop(rect.top + rect.height + window.scrollY)
      setLeft(rect.left)
    }
    setShow(nextState)
  }

  let selectedOption = options.find((opt) => opt.value === value)
  if (!selectedOption) {
    selectedOption = options.find(
      (opt) => opt.value === FILTER_OPTION_DEFAULT
    ) as IFilterOption
  }
  const classes = classNames(styles.dropdown, {
    [styles.activate]: value !== FILTER_OPTION_DEFAULT,
    [styles.sm]: size === 'sm',
  })
  return (
    <div className={styles.dropdownContainer}>
      <div
        ref={dropDownRef}
        className={classes}
        onClick={toggleDropdown}>
        <span>{selectedOption.label}</span>
        {value === FILTER_OPTION_DEFAULT ? null : (
          <img
            src={browser.runtime.getURL(deleteIcon)}
            className={styles.clearIcon}
            onClick={clear}
          />
        )}
        <DropDownArrow
          color={
            selectedOption.value === FILTER_OPTION_DEFAULT ? 'dark' : 'light'
          }
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
    <img
      className={styles.dropdownArrow}
      src={browser.runtime.getURL(svg)}
    />
  )
}
