import { IStorageManager } from './storageManager.interface'
import { ISiteItem } from './base'

export class StorageManagerImpl implements IStorageManager {
  private key = 'siteList'

  addSite = async (site: ISiteItem): Promise<boolean> => {
    const siteList = await this.getSiteList()
    const index = siteList.findIndex((item) => item.domain === site.domain)
    if (index !== -1) return false
    siteList.push(site)
    await this.setSiteList(siteList)
    return true
  }

  removeSite = async (site: ISiteItem): Promise<boolean> => {
    const siteList = await this.getSiteList()
    const index = siteList.findIndex((item) => item.domain === site.domain)
    if (index === -1) return false
    siteList.splice(index, 1)
    await this.setSiteList(siteList)
    return true
  }

  getSiteList = async (): Promise<ISiteItem[]> => {
    const data = await browser.storage.local.get(this.key)
    return data.siteList || []
  }

  setSiteList = async (siteList: ISiteItem[]): Promise<void> => {
    await browser.storage.local.set({ [this.key]: siteList })
  }

  toggleSiteStatus = async (site: ISiteItem): Promise<boolean> => {
    const siteList = await this.getSiteList()
    const siteItem = siteList.find((item) => item.domain === site.domain)
    if (!siteItem) {
      return false
    }
    switch (siteItem.status) {
      case 'include':
        siteItem.status = 'none'
        break
      case 'exclude':
        siteItem.status = 'include'
        break
      case 'none':
        siteItem.status = 'exclude'
        break
      default:
    }

    await this.setSiteList(siteList)
    return true
  }
}
