import * as React from 'react'
import classNames from 'classnames'
import type { IFilter } from '@/models/base'

import css from './FilterBox.module.scss'

export type FilterBoxProps = {
  onSelect: (filter: IFilter) => void
  filter: IFilter
  size?: 'sm'
}
const FilterBox = ({ onSelect, filter, size }: FilterBoxProps) => {
  const { name, value, options } = filter
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value
    onSelect({ ...filter, value })
  }

  const styles = classNames(css.dropdown, {
    [css.inactive]: value === 'all',
    [css.sm]: size === 'sm',
  })
  return (
    <select
      value={value}
      multiple
      onChange={onChange}
      className={styles}>
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

export default FilterBox
