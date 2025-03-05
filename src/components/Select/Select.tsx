import clsx from 'clsx'

interface SelectOption {
  label: string
  value: string
}
export interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  onClear?: () => void
}

export function Select({ options, onChange, value }: SelectProps) {
  const onOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    onChange(selectedValue)
  }
  const classes = clsx(value !== 'all' && 'bg-primary text-primary-content')

  return (
    <select
      className={`xxy-select xxy-select-xs focus:outline-0 w-auto focus-within:outline-0 outline-0 ${classes}`}
      onChange={onOptionSelect}
      value={value}
    >
      {options.map((option, index) => (
        <option
          className='text-xs'
          key={index}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
