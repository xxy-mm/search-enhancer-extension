import React, { useRef } from 'react'
import { useContext, useEffect, useState } from 'react'
import type { ISiteItem, IListViewStyle } from '@/models/base'
import { DataMessageContext } from '@/contexts/DataMessageContextProvider'
import SiteListViewSwitcher from '@/components/SiteListViewSwitcher/SiteListViewSwitcher'
import SiteItem from '@/components/SiteItem/SiteItem'
import IconInput from '@/components/IconInput/IconInput'

import searchIcon from './search.svg'
import css from './App.module.css'
import addIcon from './add.svg'

const App = () => {
  const { addSite, sites, removeSite, toggleSiteStatus } =
    useContext(DataMessageContext)
  const [search, setSearch] = useState<string>('')
  const [filteredSites, setFilteredSites] = useState<ISiteItem[]>([])

  const dragItem = useRef(null)
  const createSite = (domain: string) => {
    addSite({ domain, status: 'none' })
  }
  const switchListViewStyle = (style: IListViewStyle): void => {
    //todo: switch view style
    console.log('current style:', style)
  }

  useEffect(() => {
    let filtered = sites
    if (search.trim() !== '') {
      filtered = sites.filter((site) => site.domain.includes(search))
    }
    setFilteredSites(filtered)
  }, [search, sites])

  return (
    <div className={css.container}>
      <h1 className={css.title}>Search Enhancer</h1>
      <div className={css.actionGroup}>
        <SiteListViewSwitcher onSwitch={switchListViewStyle} />
        <IconInput
          placeholder='Search'
          icon={searchIcon}
          onChange={setSearch}
        />
      </div>
      <div className={css.siteList}>
        {filteredSites.map((siteItem) => (
          <SiteItem
            item={siteItem}
            key={siteItem.domain}
            onRemove={removeSite}
            onToggle={toggleSiteStatus}
          />
        ))}
      </div>
      <div className={`${css.actionGroup} ${css.flexEnd}`}>
        <IconInput
          placeholder='Input the site then press enter'
          icon={addIcon}
          onEnter={createSite}
        />
      </div>
    </div>
  )
}

export default App
