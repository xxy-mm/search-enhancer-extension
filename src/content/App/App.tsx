import React, { useContext, useEffect } from 'react'
import { DataMessageContext } from '@/contexts/DataMessageContextProvider'
import SiteItem from '@/components/SiteItem/SiteItem'

import css from './App.module.css'

const App = () => {
  const { toggleSiteStatus, removeSite, sites } = useContext(DataMessageContext)
  // const [sortedSites, setSortedSites] = useState<ISiteItemList>([])

  useEffect(() => {
    // const sorted = sites.sort(siteSorter)
    // setSortedSites(sorted)
  }, [sites])
  return (
    <div className={css.container}>
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
