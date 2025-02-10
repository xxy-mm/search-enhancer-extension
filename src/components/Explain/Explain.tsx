import { type ISite } from '@/models/base'
import SiteBox from '@/components/SiteBox'

import css from './Explain.module.css'

const explainItems: ISite[] = [
  { domain: 'Activate', isActive: false },
  { domain: 'Inactivate', isActive: false },
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
