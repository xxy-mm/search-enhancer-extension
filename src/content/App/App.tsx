import { SiteItemType } from '@/models/base'
import { useMessage } from '@/hooks/useMessage'
import { useInputSync } from '@/hooks/useInputSync'
import { Button, SiteItem } from '@/components'
import deleteIcon from '@/assets/images/delete.svg'

import css from './App.module.css'

const App = () => {
  const { siteItems } = useMessage()
  useInputSync()

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
      <Button
        size='sm'
        type='warning'
        rounded>
        <img src={browser.runtime.getURL(deleteIcon)} />
      </Button>
    </div>
  )
}

export default App
