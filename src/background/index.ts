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

  await queryAndNotify()
})

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
    await browser.runtime.sendMessage(notifyUpdate(data))
  } catch (e: unknown) {
    console.log('Failed to send message to popup', e)
  }
}
async function notifyTabs(data: ISearchConfig): Promise<void> {
  const tabs = await browser.tabs.query({})
  tabs.forEach(async (tab) => {
    if (tab.id) {
      try {
        await browser.tabs.sendMessage(tab.id, notifyUpdate(data))
      } catch (e: unknown) {
        console.log('Failed to send message to tab', tab.id, e)
      }
    }
  })
}
