import { ISite, type IFilter, type ISiteItemList } from './base'

export interface IStorageManager {
  getSiteItemList(): Promise<ISiteItemList>
  setSiteItemList(siteItemList: ISiteItemList): Promise<void>
  addSite(site: ISite): Promise<boolean>
  removeSite(site: ISite): Promise<boolean>
  toggleSiteStatus(site: ISite): Promise<boolean>
  setFilter(filter: IFilter): Promise<boolean>
}
