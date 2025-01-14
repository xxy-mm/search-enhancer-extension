import React from 'react'
import { useContext, useEffect, useState } from 'react'
import type { ISiteItem, IListViewStyle } from '@/models/base'
import { PopupContext } from '@/contexts/PopupContext'
import SiteListViewSwitcher from '@/components/SiteListViewSwitcher/SiteListViewSwitcher'
import SiteItem from '@/components/SiteItem/SiteItem'
import IconInput from '@/components/IconInput/IconInput'

import searchIcon from './search.svg'
import css from './App.module.css'
import addIcon from './add.svg'

const App = () => {
  const { addSite, siteItems, removeSite, toggleSiteStatus } =
    useContext(PopupContext)
  const [search, setSearch] = useState<string>('')
  const [filteredSites, setFilteredSites] = useState<ISiteItem[]>([])

  const switchListViewStyle = (style: IListViewStyle): void => {
    //todo: switch view style
    console.log('current style:', style)
  }

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredSites(siteItems)
      return
    }
    const filtered = siteItems.filter((siteItem) =>
      siteItem.domain.includes(search)
    )
    setFilteredSites(filtered)
  }, [search, siteItems])

  return (
    <div className={css.container}>
      {/* header */}
      <h1 className={css.title}>Search Enhancer</h1>

      {/* top action group */}
      <div className={css.actionGroup}>
        {/* compact/grouped select */}
        <SiteListViewSwitcher onSwitch={switchListViewStyle} />
        {/* search */}
        <IconInput
          placeholder='Search'
          icon={searchIcon}
          onChange={setSearch}
        />
      </div>

      {/* site list */}
      <div className={css.siteList}>
        {/* site list item */}
        {filteredSites.map((siteItem) => (
          <SiteItem
            item={siteItem}
            key={siteItem.domain}
            onRemove={(site) => removeSite(site.domain)}
            onToggle={(site) => toggleSiteStatus(site.domain)}
          />
        ))}
      </div>

      {/* bottom action group */}
      <div className={`${css.actionGroup} ${css.flexEnd}`}>
        {/* input for add site */}

        <IconInput
          placeholder='Input the site then press enter'
          icon={addIcon}
          onEnter={addSite}
        />
      </div>
    </div>
  )
}

export default App
