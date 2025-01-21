import { SiteItemType } from '@/models/base'
import { useMessage } from '@/hooks/useMessage'
import { SiteItem } from '@/components'

import css from './App.module.scss'

const App = () => {
  const { siteItems } = useMessage()
  return (
    <div className={css.container}>
      {siteItems.map((siteItem) => {
        const key =
          siteItem.type === SiteItemType.FILTER
            ? siteItem.name
            : siteItem.domain
        return (
          <SiteItem
            siteItem={siteItem}
            canToggleSite={true}
            key={key}
            size='sm'
          />
        )
      })}
    </div>
  )
}

export default App
