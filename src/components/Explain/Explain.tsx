import * as React from 'react'
import type { ISiteItemList } from '@/models/base'

import css from './Explain.module.css'
import SiteItem from '../SiteItem/SiteItem'

const explainItems: ISiteItemList = [
  {
    domain: 'Included',
    status: 'include',
  },
  {
    domain: 'Excluded',
    status: 'exclude',
  },
  {
    domain: 'No Effect',
    status: 'none',
  },
]
const Explain = () => {
  return (
    <div className={css.explainComponent}>
      {explainItems.map((item) => (
        <SiteItem
          size='sm'
          item={item}
          key={item.domain}
        />
      ))}
    </div>
  )
}

export default Explain
