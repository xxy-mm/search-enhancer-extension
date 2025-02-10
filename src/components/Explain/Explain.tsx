import { SiteItemType, type ISite } from '@/models/base'
import SiteBox from '@/components/SiteBox'

import css from './Explain.module.css'

const explainItems: ISite[] = [
  { type: SiteItemType.SITE, domain: 'Activate', isActive: false },
  { type: SiteItemType.SITE, domain: 'Inactivate', isActive: false },
]
const Explain = () => {
  return (
    <div className={css.explainComponent}>
      <legend>Status:</legend>
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
