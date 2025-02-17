import { StorageManagerImpl } from '@/models/storageManagerImpl'
import {
  IDataAction,
  notifyUpdate,
  type IMessage,
  type ISearchConfig,
} from '@/models/base'
import { fileTypeFilter } from '@/filters/filetype'

const manager = new StorageManagerImpl()

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
    case IDataAction.UPDATE_ALL:
      await manager.setSearchConfig(message.data)
      break
    case IDataAction.SORT_SITES:
      await manager.setSites(message.data)
      break
    default:
      throw `Unknown message: ${message}`
  }
  let searchConfig = await manager.getSearchConfig()
  if (searchConfig.filters.length === 0) {
    await manager.setFilters([fileTypeFilter])
  }
  searchConfig = await manager.getSearchConfig()
  notify(searchConfig)
})

function notify(data: ISearchConfig) {
  // FIXME: if using await, the execution hangs forever, why?
  browser.runtime.sendMessage(notifyUpdate(data))
  notifyTabs(data)
}

async function notifyTabs(data: ISearchConfig) {
  const tabs = await browser.tabs.query({})
  tabs.forEach((tab) => {
    if (tab.id) browser.tabs.sendMessage(tab.id, notifyUpdate(data))
  })
}
