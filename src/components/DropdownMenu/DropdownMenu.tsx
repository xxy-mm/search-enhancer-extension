import classNames from 'classnames'
import type { IFilterOption, IFilterOptions } from '@/models/base'

import styles from './DropdownMenu.module.css'

export interface DropdownMenuProps {
  options: IFilterOptions
  onSelect: (option: IFilterOption) => void
  size?: 'sm'
  style?: React.CSSProperties
}

export function DropdownMenu({
  style,
  size,
  options,
  onSelect,
}: DropdownMenuProps) {
  const classes = classNames(styles.dropdownList, {
    [styles.sm]: size === 'sm',
  })
  return (
    <div
      className={styles.dropdownMenu}
      style={style}>
      <ul className={classes}>
        {options.map((opt) => {
          return (
            <li
              className={styles.listItem}
              key={opt.value}
              onClick={() => onSelect(opt)}>
              {opt.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
