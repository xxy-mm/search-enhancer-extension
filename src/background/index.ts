import { StorageManagerImpl } from '@/models/storageManagerImpl'
import {
  IDataAction,
  notifyUpdate,
  type IMessage,
  type ISearchConfig,
} from '@/models/base'
import { fileTypeFilter } from '@/filters/filetype'

const manager = new StorageManagerImpl()

chrome.runtime.onMessage.addListener(
  (message: IMessage, sender, sendResponse): boolean | undefined => {
    let promise = Promise.resolve()
    switch (message.type) {
      case IDataAction.QUERY:
        break
      case IDataAction.CREATE_SITE:
        promise = manager.addSite(message.data)
        break
      case IDataAction.DELETE_SITE:
        promise = manager.removeSite(message.data)
        break
      case IDataAction.UPDATE_ALL:
        promise = manager.setSearchConfig(message.data)
        break
      case IDataAction.SORT_SITES:
        promise = manager.setSites(message.data)
        break
      default:
        throw `Unknown message: ${message}`
    }

    promise.then(queryAndNotify).then(sendResponse)
    return true
  }
)

async function queryAndNotify(): Promise<void> {
  let searchConfig = await manager.getSearchConfig()
  if (searchConfig.filters.length === 0) {
    await manager.setFilters([fileTypeFilter])
  }
  searchConfig = await manager.getSearchConfig()
  await notifyPopup(searchConfig)
  await notifyTabs(searchConfig)
}

async function notifyPopup(data: ISearchConfig): Promise<void> {
  try {
    await chrome.runtime.sendMessage(notifyUpdate(data))
  } catch (e: unknown) {
    console.log('Failed to send message to popup', e)
  }
}
async function notifyTabs(data: ISearchConfig): Promise<void> {
  const tabs = await chrome.tabs.query({})
  tabs.forEach(async (tab) => {
    if (tab.id) {
      try {
        await chrome.tabs.sendMessage(tab.id, notifyUpdate(data))
      } catch (e: unknown) {
        console.log('Failed to send message to tab', tab.id, e)
      }
    }
  })
}
