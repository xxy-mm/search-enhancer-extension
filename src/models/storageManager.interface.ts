import { ISiteItem } from "./base"

export interface IStorageManager {
    getSiteList(): Promise<ISiteItem[]>
    setSiteList(siteList: ISiteItem[]): Promise<void>
    addSite(domain: string): Promise<boolean>
    removeSite(domain: string): Promise<boolean>
    toggleSiteStatus(domain: string): Promise<boolean>
}