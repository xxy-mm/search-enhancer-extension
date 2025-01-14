import * as React from 'react'

import css from './SiteItem.module.css'
import deleteIcon from './delete.svg'
import { ISiteItem } from '../../models/base'

type SiteItemProps = {
  item: ISiteItem
  onRemove: (siteItem: ISiteItem) => void
  onToggle: (siteItem: ISiteItem) => void
}

const SiteItem = ({ item, onRemove, onToggle }: SiteItemProps) => {
  const remove = () => {
    onRemove(item)
  }

  const toggleStatus = () => {
    onToggle(item)
  }

  return (
    <div
      className={`${css.siteListItem} ${css[item.status] || ''}`}
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
