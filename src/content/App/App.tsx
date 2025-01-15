import React, { useContext } from 'react'
import {
  fileTypeFilterOptions,
  IFilterType,
  type ISiteFilter,
} from '@/models/base'
import { DataMessageContext } from '@/contexts/DataMessageContextProvider'
import SiteItem from '@/components/SiteItem/SiteItem'
import DropDown from '@/components/DropDown/DropDown'

import css from './App.module.css'

const App = () => {
  const { toggleSiteStatus, removeSite, sites, changeFilter, filters } =
    useContext(DataMessageContext)

  const filter = (filters.find((f) => f.type === IFilterType.FILE_TYPE) ||
    {}) as ISiteFilter

  return (
    <div className={css.container}>
      <DropDown
        isActive={filter.value != 'all'}
        onSelect={(value) => {
          changeFilter({ type: IFilterType.FILE_TYPE, value })
        }}
        value={filter.value}
        options={fileTypeFilterOptions}
      />
      {sites.map((site) => (
        <SiteItem
          item={site}
          key={site.domain}
          onRemove={removeSite}
          onToggle={toggleSiteStatus}
          size='sm'
        />
      ))}
    </div>
  )
}

export default App
