import { ISiteItem } from './base'

export interface IStorageManager {
  getSiteList(): Promise<ISiteItem[]>
  setSiteList(siteList: ISiteItem[]): Promise<void>
  addSite(site: ISiteItem): Promise<boolean>
  removeSite(site: ISiteItem): Promise<boolean>
  toggleSiteStatus(site: ISiteItem): Promise<boolean>
}
