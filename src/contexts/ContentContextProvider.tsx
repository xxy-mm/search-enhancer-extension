import * as React from 'react'
import { useEffect, useState } from 'react'
import { ISiteItem } from '../models/base'
import { IStorageManager } from '../models/storageManager.interface'
import { ContentContext } from './ContentContext'

type ContentContextProviderProps = {
  storageManager: IStorageManager
} & React.PropsWithChildren

export const ContentContextProvider = ({
  children,
  storageManager,
}: ContentContextProviderProps) => {
  const [siteItems, setSiteItems] = useState<ISiteItem[]>([])

  const addSite = (domain: string) => {
    storageManager
      .addSite(domain)
      .then(storageManager.getSiteList)
      .then(setSiteItems)
  }

  const removeSite = (domain: string) => {
    storageManager
      .removeSite(domain)
      .then(storageManager.getSiteList)
      .then(setSiteItems)
  }

  const toggleSiteStatus = (domain: string) => {
    storageManager
      .toggleSiteStatus(domain)
      .then(storageManager.getSiteList)
      .then(setSiteItems)
  }

  useEffect(() => {
    storageManager.getSiteList().then(setSiteItems)
  }, [storageManager])

  return (
    <ContentContext.Provider
      value={{
        addSite,
        removeSite,
        toggleSiteStatus,
        siteItems,
      }}>
      {children}
    </ContentContext.Provider>
  )
}
