import { SiteItemType } from '@/models/base'
import { useMessage } from '@/hooks/useMessage'
import { useInputSync } from '@/hooks/useInputSync'
import { SiteItem } from '@/components'

import css from './App.module.css'

const App = () => {
  const { siteItems } = useMessage()
  useInputSync()
  // useSearch()
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
