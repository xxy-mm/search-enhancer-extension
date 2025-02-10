import invariant from 'tiny-invariant'
import { useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { type IFilter, type IFilterOption } from '@/models/base'
import { useSearchInput } from '@/hooks/useSearchInput'

import styles from './Dropdown.module.css'
import deleteIcon from './delete.svg'
import lightArrow from './arrow-down-light.svg'
import darkArrow from './arrow-down-dark.svg'
import { DropdownMenu } from '../DropdownMenu'

export interface DropdownProps {
  onSelect: (filter: IFilter) => void
  filter: IFilter
  size?: 'sm'
  disabled?: boolean
}

export function Dropdown({ onSelect, filter, size, disabled }: DropdownProps) {
  const { value, options } = filter
  const { searchInput } = useSearchInput()
  const dropDownRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  const onChange = (newOption: IFilterOption) => {
    if (disabled) return
    const value = newOption.value
    onSelect({ ...filter, value })
    setShow(false)
    if (searchInput) {
      searchInput.focus()
    }
  }

  const clear = (e: MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
    const value = 'all'
    onSelect({ ...filter, value })
    setShow(false)
    if (searchInput) {
      searchInput.focus()
    }
  }
  const toggleDropdown = () => {
    if (disabled) return
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
    [styles.activate]: value !== 'all',
    [styles.sm]: size === 'sm',
  })
  return (
    <div className={styles.dropdownContainer}>
      <div
        ref={dropDownRef}
        className={classes}
        onClick={toggleDropdown}>
        <span>{selectedOption.label}</span>
        {value === 'all' ? null : (
          <img
            src={browser.runtime.getURL(deleteIcon)}
            className={styles.clearIcon}
            onClick={clear}
          />
        )}
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
    <img
      className={styles.dropdownArrow}
      src={browser.runtime.getURL(svg)}
    />
  )
}
