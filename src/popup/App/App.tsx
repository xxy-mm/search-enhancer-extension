import React from 'react'
import { useContext, useEffect, useState } from 'react'
import {
  type ISiteItem,
  type ISiteFilter,
  IFilterType,
  fileTypeFilterOptions,
} from '@/models/base'
import { DataMessageContext } from '@/contexts/DataMessageContextProvider'
import SiteItem from '@/components/SiteItem/SiteItem'
import IconInput from '@/components/IconInput/IconInput'
import DropDown from '@/components/DropDown/DropDown'

import searchIcon from './search.svg'
import css from './App.module.css'
import addIcon from './add.svg'

const App = () => {
  const {
    addSite,
    sites,
    removeSite,
    toggleSiteStatus,
    changeFilter,
    filters,
  } = useContext(DataMessageContext)
  const [search, setSearch] = useState<string>('')
  const [filteredSites, setFilteredSites] = useState<ISiteItem[]>([])
  const filter = (filters.find((f) => f.type === IFilterType.FILE_TYPE) ||
    {}) as ISiteFilter
  const createSite = (domain: string) => {
    addSite({ domain, status: 'none' })
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
      <div className={`${css.actionGroup} ${css.flexEnd}`}>
        <IconInput
          placeholder='Search'
          icon={searchIcon}
          onChange={setSearch}
        />
      </div>
      <div className={css.siteList}>
        <DropDown
          isActive={filter.value != 'all'}
          onSelect={(value) => {
            changeFilter({ type: IFilterType.FILE_TYPE, value })
          }}
          value={filter.value}
          options={fileTypeFilterOptions}
        />
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
