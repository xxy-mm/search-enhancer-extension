import { StorageManagerImpl } from '@/models/storageManagerImpl'
import {
  FILETYPE_FILTER_OPTIONS,
  IDataAction,
  IFilterName,
  notifyUpdate,
  SiteItemType,
  type IFilter,
  type IMessage,
  type ISiteItemList,
} from '@/models/base'

const manager = new StorageManagerImpl()

const fileTypeFilter: IFilter = {
  name: IFilterName.FILE_TYPE,
  options: FILETYPE_FILTER_OPTIONS,
  type: SiteItemType.FILTER,
  value: 'all',
}

browser.runtime.onMessage.addListener(async (message: IMessage) => {
  switch (message.type) {
    case IDataAction.QUERY:
      break
    case IDataAction.CREATE_SITE:
      await manager.addSite(message.data)
      break
    case IDataAction.DELETE_SITE:
      await manager.removeSite(message.data)
      break
    case IDataAction.UPDATE_SITE:
      await manager.toggleSiteStatus(message.data)
      break
    case IDataAction.UPDATE_FILTER:
      await manager.setFilter(message.data)
      break
    case IDataAction.UPDATE_ALL:
      await manager.setSiteItemList(message.data)
      break
    default:
      throw `Unknown message: ${message}`
  }
  const siteItems = await manager.getSiteItemList()
  if (siteItems.length === 0) {
    await manager.setFilter(fileTypeFilter)
    notify([fileTypeFilter])
  } else {
    notify(siteItems)
  }
})

async function notify(data: ISiteItemList) {
  browser.runtime.sendMessage(notifyUpdate(data))
  notifyTabs(data)
}

async function notifyTabs(data: ISiteItemList) {
  const tabs = await browser.tabs.query({
    currentWindow: true,
    active: true,
  })
  const id = tabs[0]?.id
  if (id === undefined) return
  browser.tabs.sendMessage(id, notifyUpdate(data))
}
