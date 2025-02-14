import { useEffect, useState } from 'react'
import {
  addSiteMessage,
  removeSiteMessage,
  ISite,
  queryMessage,
  type IMessage,
  IDataAction,
  type ISearchConfig,
  sortSitesMessage,
} from '@/models/base'

export function useMessage() {
  const [searchConfig, setSearchConfig] = useState<ISearchConfig>()

  const listener = (message: IMessage) => {
    if (message.type === IDataAction.UPDATED) {
      setSearchConfig(message.data.searchConfig)
    }
  }
  const addSite = (item: ISite) => {
    browser.runtime.sendMessage(addSiteMessage(item))
  }

  const removeSite = (item: ISite) => {
    browser.runtime.sendMessage(removeSiteMessage(item))
  }

  const sortSites = (sites: ISite[]) => {
    browser.runtime.sendMessage(sortSitesMessage(sites))
  }

  // FEAT: add filter, remove filter
  useEffect(() => {
    browser.runtime.sendMessage(queryMessage())
  }, [])

  useEffect(() => {
    browser.runtime.onMessage.addListener(listener)
    return () => browser.runtime.onMessage.removeListener(listener)
  }, [])

  return {
    addSite,
    removeSite,
    searchConfig,
    sortSites,
  }
}
