import { SiteItemType } from '@/models/base'
// import { useSiteFilter } from '@/hooks/useSiteFilter'
import { useMessage } from '@/hooks/useMessage'
import IconInput from '@/components/IconInput/IconInput'
import { SiteItem } from '@/components'

import addIcon from './plus.circle.svg'
import css from './App.module.css'

const App = () => {
  const { addSite, siteItems } = useMessage()
  // const { setFilterText, filtered } = useSiteFilter()

  const createSite = (domain: string) => {
    addSite({
      domain,
      isActive: false,
      type: SiteItemType.SITE,
    })
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Search Enhancer</h1>

      {/* <div className={`${css.actionGroup} ${css.flexEnd}`}>
        <IconInput
          placeholder='Filter'
          icon={FilterIcon}
          onChange={setFilterText}
        />
      </div> */}

      <div className={css.siteList}>
        {siteItems.map((siteItem) => {
          const key =
            siteItem.type === SiteItemType.FILTER
              ? siteItem.name
              : siteItem.domain
          return (
            <SiteItem
              siteItem={siteItem}
              key={key}
              canRemoveSite={true}
              canToggleSite={true}
            />
          )
        })}
      </div>
      <div className={`${css.actionGroup} ${css.flexEnd}`}>
        <IconInput
          placeholder='Input a site then press enter'
          icon={addIcon}
          onEnter={createSite}
        />
      </div>
    </div>
  )
}

export default App
