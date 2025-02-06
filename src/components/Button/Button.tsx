import type { PropsWithChildren } from 'react'
import classNames from 'classnames'

import styles from './Button.module.css'

export interface ButtonProps extends PropsWithChildren {
  onClick?: (e: React.MouseEvent) => void
  type?: 'primary' | 'warning'
  sm?: boolean
}

export function Button({ onClick, type, sm, children }: ButtonProps) {
  const onButtonClick = (e: React.MouseEvent) => {
    if (onClick) onClick(e)
  }
  const classes = classNames(styles.button, {
    [styles.primary]: type === 'primary',
    [styles.warning]: type === 'warning',
    [styles.sm]: sm,
  })
  return (
    <div
      className={classes}
      onClick={onButtonClick}>
      {children}
    </div>
  )
}
