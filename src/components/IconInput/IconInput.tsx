import React, { useId } from 'react'
import { FunctionComponent } from 'react'
import css from './IconInput.module.css'

interface IconInputProps {
  icon?: string
  placeholder?: string
  onChange?: (value: string) => void
  onEnter?: (value: string) => void
}

const IconInput: FunctionComponent<IconInputProps> = ({
  icon,
  placeholder = '',
  onChange,
  onEnter,
}) => {
  const inputId = useId()

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement
      const value = input.value
      if (onEnter) {
        onEnter(value)
        input.value = ''
      }
    }
  }

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange) onChange(event.target.value)
  }
  return (
    <div className={css.iconInput}>
      <input
        type='text'
        id={inputId}
        placeholder={placeholder}
        onChange={onValueChange}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor={inputId}>
        <img
          className={css.inputIcon}
          src={icon}
        />
      </label>
    </div>
  )
}

export default IconInput
