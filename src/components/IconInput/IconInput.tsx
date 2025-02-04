import React, { useId, type ChangeEvent } from 'react'
import { FunctionComponent } from 'react'

import css from './IconInput.module.css'

interface IconInputProps {
  icon: string
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

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && onEnter) {
      const inputElement = e.target as HTMLInputElement
      onEnter(inputElement.value)
      inputElement.value = ''
    }
  }

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value)
  }
  return (
    <div className={css.iconInput}>
      <input
        className={css.textInput}
        type='text'
        id={inputId}
        placeholder={placeholder}
        onChange={onValueChange}
        onKeyDown={handleKeyDown}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        autoFocus
        spellCheck='false'
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
