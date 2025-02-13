import * as React from 'react'
import classNames from 'classnames'
import { FILTER_OPTION_DEFAULT, type IFilter } from '@/models/base'

import css from './FilterBox.module.css'

export type FilterBoxProps = {
  onSelect: (filter: IFilter) => void
  filter: IFilter
  size?: 'sm'
}
const FilterBox = ({ onSelect, filter, size }: FilterBoxProps) => {
  const { value, options } = filter
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value
    onSelect({ ...filter, value })
  }

  const styles = classNames(css.dropdown, {
    [css.inactive]: value === FILTER_OPTION_DEFAULT,
    [css.sm]: size === 'sm',
  })

  return (
    <select
      value={value}
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
