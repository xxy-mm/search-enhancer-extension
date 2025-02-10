import type { PropsWithChildren } from 'react'
import classNames from 'classnames'

import styles from './Button.module.css'

export interface ButtonProps extends PropsWithChildren {
  onClick?: (e: React.MouseEvent) => void
  type?: 'primary' | 'warning'
  size?: 'sm'
  rounded?: boolean
}

export function Button({
  onClick,
  type,
  rounded,
  size,
  children,
}: ButtonProps) {
  const onButtonClick = (e: React.MouseEvent) => {
    if (onClick) onClick(e)
  }
  const classes = classNames(styles.button, {
    [styles.primary]: type === 'primary',
    [styles.warning]: type === 'warning',
    [styles.sm]: size === 'sm',
    [styles.rounded]: rounded,
  })
  return (
    <button
      type={'button'}
      className={classes}
      onClick={onButtonClick}>
      {children}
    </button>
  )
}
