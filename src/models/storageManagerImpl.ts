import { IStorageManager } from './storageManager.interface'
import { ISite, SiteItemType, type IFilter, type ISiteItemList } from './base'

export class StorageManagerImpl implements IStorageManager {
  private key = 'siteItemList'

  addSite = async (site: ISite): Promise<boolean> => {
    const siteItemList = await this.getSiteItemList()
    const index = siteItemList.findIndex(
      (item) => item.type === SiteItemType.SITE && item.domain === site.domain
    )
    if (index !== -1) return false
    siteItemList.push(site)
    await this.setSiteItemList(siteItemList)
    return true
  }

  removeSite = async (site: ISite): Promise<boolean> => {
    const siteList = await this.getSiteItemList()
    const index = siteList.findIndex(
      (item) => item.type === SiteItemType.SITE && item.domain === site.domain
    )
    if (index === -1) return false
    siteList.splice(index, 1)
    await this.setSiteItemList(siteList)
    return true
  }

  getSiteItemList = async (): Promise<ISiteItemList> => {
    const data = await browser.storage.local.get(this.key)
    return data[this.key] || []
  }

  setSiteItemList = async (siteItemList: ISiteItemList): Promise<void> => {
    await browser.storage.local.set({ [this.key]: siteItemList })
  }

  toggleSiteStatus = async (site: ISite): Promise<boolean> => {
    const siteItemList = await this.getSiteItemList()
    const siteItem = siteItemList.find(
      (item) => item.type === SiteItemType.SITE && item.domain === site.domain
    ) as ISite | undefined
    if (!siteItem) {
      return false
    }
    siteItem.isActive = !siteItem.isActive

    await this.setSiteItemList(siteItemList)
    return true
  }

  setFilter = async (filter: IFilter): Promise<boolean> => {
    const siteItemList = await this.getSiteItemList()
    const found = siteItemList.find(
      (f) => f.type === SiteItemType.FILTER && f.name === filter.name
    ) as IFilter | undefined
    if (found) {
      found.value = filter.value
    } else {
      siteItemList.push(filter)
    }
    await this.setSiteItemList(siteItemList)
    return true
  }

  reset = async () => {
    const siteItems = await this.getSiteItemList()
    siteItems.forEach((item) => {
      if (item.type === SiteItemType.FILTER) {
        item.value = 'all'
      } else {
        item.isActive = false
      }
    })
    await this.setSiteItemList(siteItems)
  }
}
