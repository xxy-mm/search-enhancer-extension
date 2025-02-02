import { useEffect, useState } from 'react'
import {
  addSiteMessage,
  removeSiteMessage,
  ISite,
  queryMessage,
  toggleSiteMessage,
  ISiteItemList,
  type IMessage,
  IDataAction,
  type IFilter,
  changeFilterMessage,
  sortMessage,
  updateAllMessage,
} from '@/models/base'

export function useMessage() {
  const [siteItems, setSiteItems] = useState<ISiteItemList>([])

  const listener = (message: IMessage) => {
    if (message.type === IDataAction.UPDATED) {
      setSiteItems(message.data.siteItems)
    }
  }
  const addSite = (item: ISite) => {
    browser.runtime.sendMessage(addSiteMessage(item))
  }

  const removeSite = (item: ISite) => {
    browser.runtime.sendMessage(removeSiteMessage(item))
  }

  const toggleSite = (item: ISite) => {
    browser.runtime.sendMessage(toggleSiteMessage(item))
  }

  const changeFilter = (filter: IFilter) => {
    browser.runtime.sendMessage(changeFilterMessage(filter))
  }

  const updateSiteItems = (siteItems: ISiteItemList) => {
    browser.runtime.sendMessage(updateAllMessage(siteItems))
  }

  const sort = (siteItems: ISiteItemList) => {
    browser.runtime.sendMessage(sortMessage(siteItems))
  }

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
    toggleSite,
    changeFilter,
    siteItems,
    sort,
    updateSiteItems,
  }
}
