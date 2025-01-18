import * as React from 'react'

import css from './SiteItem.module.css'
import deleteIcon from './delete.svg'
import { ISiteItem } from '../../models/base'

type SiteItemProps = {
  item: ISiteItem
  onRemove?: (siteItem: ISiteItem) => void
  onToggle?: (siteItem: ISiteItem) => void
  size?: 'sm'
}

const SiteItem = ({ item, onRemove, onToggle, size }: SiteItemProps) => {
  const remove: React.MouseEventHandler = (e) => {
    e.stopPropagation()
    if (onRemove) onRemove(item)
  }

  const toggleStatus = () => {
    if (onToggle) onToggle(item)
  }

  return (
    <button
      type='button'
      className={`${css.siteListItem} ${size === 'sm' ? css.sm : ''} ${
        css[item.status] || ''
      }`}
      onClick={toggleStatus}>
      {item.domain}
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

export default SiteItem
