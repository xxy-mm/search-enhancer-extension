import { useEffect, useState } from 'react'
import { PopupContext } from './PopupContext'
import { IStorageManager } from '../models/storageManager.interface'
import { ISiteItem } from '../models/base'
import * as React from 'react'

type PopupContextProviderProps = {
  storageManager: IStorageManager
} & React.PropsWithChildren
export const PopupContextProvider = ({
  children,
  storageManager,
}: PopupContextProviderProps) => {
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
    <PopupContext.Provider
      value={{
        addSite,
        removeSite,
        toggleSiteStatus,
        siteItems,
      }}>
      {children}
    </PopupContext.Provider>
  )
}
