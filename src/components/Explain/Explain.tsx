import { SiteItemType, SiteStatus, type ISite } from '@/models/base'
import SiteBox from '@/components/SiteBox'

import css from './Explain.module.css'

const explainItems: ISite[] = [
  { type: SiteItemType.SITE, domain: 'Included', status: SiteStatus.INCLUDE },
  { type: SiteItemType.SITE, domain: 'No Effect', status: SiteStatus.NONE },
]
const Explain = () => {
  return (
    <div className={css.explainComponent}>
      <legend>Legend:</legend>
      {explainItems.map((item) => (
        <SiteBox
          size='sm'
          site={item}
          key={item.domain}
        />
      ))}
    </div>
  )
}

export default Explain
