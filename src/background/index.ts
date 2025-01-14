import { ExtensionStorageManagerImpl } from '@/models/extensionStorageManagerImpl'
import type { IMessage } from '@/models/base'

const manager = new ExtensionStorageManagerImpl()

browser.runtime.onMessage.addListener((message: IMessage) => {
  switch (message.type) {
    case 'C':
      manager.addSite(message.data.domain)
      break
    case 'D':
      manager.removeSite(message.data.domain)
      break
    case 'U':
      manager.toggleSiteStatus(message.data.domain)
      break
  }
  return manager.getSiteList()
})
