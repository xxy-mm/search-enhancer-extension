import * as React from 'react'
import classNames from 'classnames'

import css from './SiteBox.module.css'
import deleteIcon from './delete.svg'
import { ISite, SiteStatus } from '../../models/base'

export type SiteBoxProps = {
  site: ISite
  onRemove?: (siteItem: ISite) => void
  onToggle?: (siteItem: ISite) => void
  size?: 'sm'
}

const SiteBox = ({ site, onRemove, onToggle, size }: SiteBoxProps) => {
  const remove: React.MouseEventHandler = (e) => {
    e.stopPropagation()
    if (onRemove) onRemove(site)
  }

  const toggleStatus = () => {
    if (onToggle) onToggle(site)
  }

  const styles = classNames(css.siteBox, {
    [css.sm]: size === 'sm',
    // [css.exclude]: site.status === SiteStatus.EXCLUDE,
    [css.include]: site.status === SiteStatus.INCLUDE,
  })

  const showMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    alert('hehe')
  }
  return (
    <button
      type='button'
      className={styles}
      onContextMenu={showMenu}
      onClick={toggleStatus}>
      {site.domain}
      {onRemove ? (
        <img
          className={css.deleteIcon}
          src={browser.runtime.getURL(deleteIcon)}
          onClick={remove}
        />
      ) : null}
    </button>
  )
}

export default SiteBox
