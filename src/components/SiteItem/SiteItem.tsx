import * as React from 'react'

import css from './SiteItem.module.css'
import deleteIcon from './delete.svg'
import { ISiteItem } from '../../models/base'

type SiteItemProps = {
  item: ISiteItem
  onRemove: (siteItem: ISiteItem) => void
  onToggle: (siteItem: ISiteItem) => void
  size?: 'sm'
}

const SiteItem = ({ item, onRemove, onToggle, size }: SiteItemProps) => {
  const remove: React.MouseEventHandler = (e) => {
    e.stopPropagation()
    onRemove(item)
  }

  const toggleStatus = () => {
    onToggle(item)
  }

  return (
    <div
      className={`${css.siteListItem} ${size === 'sm' ? css.sm : ''} ${
        css[item.status] || ''
      }`}
      onClick={toggleStatus}>
      {item.domain}
      <img
        className={css.deleteIcon}
        src={browser.runtime.getURL(deleteIcon)}
        onClick={remove}
      />
    </div>
  )
}

export default SiteItem
