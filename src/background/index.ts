import { StorageManagerImpl } from '@/models/storageManagerImpl'
import {
  IDataAction,
  notifyUpdate,
  type IMessage,
  type ISiteItemList,
} from '@/models/base'

const manager = new StorageManagerImpl()

browser.runtime.onMessage.addListener(async (message: IMessage) => {
  switch (message.type) {
    case IDataAction.QUERY:
      break
    case IDataAction.CREATE:
      await manager.addSite(message.data)
      break
    case IDataAction.DELETE:
      await manager.removeSite(message.data)
      break
    case IDataAction.UPDATE:
      await manager.toggleSiteStatus(message.data)
      break
    default:
      throw `Unknown message: ${message}`
  }
  const data = await manager.getSiteList()
  await notify(data)
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
  browser.tabs.sendMessage(id, notifyUpdate(data)).then(() => {
    console.log('send data', data)
  })
}
