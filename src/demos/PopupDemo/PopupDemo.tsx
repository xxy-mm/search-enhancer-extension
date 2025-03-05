import { ISite } from '@/models/base'
import { useState } from 'react'
import { Popup } from '@/components/Popup'
const mockSites: ISite[] = Array(20)
  .fill(0)
  .map((_, dix) => ({
    domain: `site${dix}.com`,
    isActive: Math.random() > 0.5,
  }))
export const PopupDemo = () => {
  const [sites, setSites] = useState<ISite[]>(mockSites)

  const addSite = (site: ISite) => {
    if (sites.find((s) => s.domain === site.domain)) {
      return
    }
    setSites([...sites, site])
  }
  const removeSite = (site: ISite) => {
    const newSites = sites.filter((s) => s.domain !== site.domain)
    setSites(newSites)
  }
  return (
    <Popup
      sortSites={setSites}
      sites={sites}
      addSite={addSite}
      removeSite={removeSite}
    />
  )
}
