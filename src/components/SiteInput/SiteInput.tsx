import { transformURL } from '../../models/utils'
import clsx from 'clsx'
import { useState, type ChangeEvent } from 'react'

export interface SiteInputProps {
  onEnter: (domain: string) => void
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function SiteInput(props: SiteInputProps) {
  const [valid, setValid] = useState(true)
  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setValid(true)
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement
      const hostname: string | null = transformURL(input.value)
      if (!hostname) {
        setValid(false)
        return
      }
      props.onEnter(hostname)
      input.value = ''
    }
  }
  const classes = clsx({
    'xxy-input-error': !valid,
  })
  return (
    <div>
      <label className={`xxy-input xxy-input-sm text-base-content ${classes}`}>
        <input
          onKeyDown={onKeydown}
          onChange={props.onChange}
          placeholder={props.placeholder}
          type='text'
        />
        <svg
          className='w-3 h-3 fill-base-content'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 -960 960 960'
        >
          <path d='M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z' />
        </svg>
      </label>
      {!valid && (
        <p className='mt-2 text-[10px] text-error'>Must be valid URL</p>
      )}
    </div>
  )
}
