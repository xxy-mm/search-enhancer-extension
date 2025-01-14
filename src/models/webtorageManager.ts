import {ISiteItem} from './base'
import { IStorageManager } from './storageManager.interface'



export class WebStorageManagerImpl implements IStorageManager {

  private key = "siteList"
  addSite = async (domain: string): Promise<boolean> => {
    const siteList = await this.getSiteList()
    const index = siteList.findIndex((item) => item.domain === domain)
    if(index !== -1) return false
    siteList.push({domain, status: 'none'})
    await this.setSiteList(siteList)
    return true
  }

  removeSite = async (domain: string): Promise<boolean> => {
    const siteList = await this.getSiteList()
    const index = siteList.findIndex((item) => item.domain === domain)
    if (index === -1) return false
    siteList.splice(index, 1)
    await this.setSiteList(siteList)
    return true
  }

  getSiteList = async(): Promise<ISiteItem[]> => {
    const data = await JSON.parse(localStorage.getItem(this.key) ?? 'null')
    return data || []
  }

  setSiteList = async (siteList: ISiteItem[]): Promise<void> => {
    await localStorage.setItem(this.key, JSON.stringify(siteList))
  }
  toggleSiteStatus = async (domain: string): Promise<boolean> => {
    const siteList = await this.getSiteList()
    const siteItem = siteList.find((item) => item.domain === domain)
    if (siteItem === undefined) return false
    switch (siteItem.status) {
      case "include":
        siteItem.status = "none"
        break
      case "exclude":
        siteItem.status = "include"
        break
      case "none":
        siteItem.status = "exclude"
        break
      default:
        return false
    }
    await this.setSiteList(siteList)
    return true
  }
}
