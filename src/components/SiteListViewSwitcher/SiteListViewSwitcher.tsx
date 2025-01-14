import * as React from 'react'
import { useState } from 'react'
import type { IListViewStyle } from '@/models/base'

import css from './SiteListViewSwitcher.module.css'

interface ISiteListViewSwitcher {
  onSwitch: (value: IListViewStyle) => void
}

const SiteListViewSwitcher = ({ onSwitch }: ISiteListViewSwitcher) => {
  const [style, setStyle] = useState<IListViewStyle>('compact')
  const isCompact = style === 'compact'
  const changeViewStyle = () => {
    const targetStyle = style === 'grouped' ? 'compact' : 'grouped'
    setStyle(targetStyle)
    onSwitch(targetStyle)
  }

  return (
    <div className={css.switch}>
      <div
        className={`${css.switchLabel} ${isCompact ? css.active : ''}`}
        onClick={changeViewStyle}>
        Compact
      </div>
      <div
        className={`${css.switchLabel} ${isCompact ? '' : css.active}`}
        onClick={changeViewStyle}>
        Grouped
      </div>
    </div>
  )
}

export default SiteListViewSwitcher
