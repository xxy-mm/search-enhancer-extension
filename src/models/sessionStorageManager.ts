import {
  type ISiteItemList,
  type ISite,
  type IFilter,
  SiteItemType,
} from './base'

export class SessionStorageManager {
  key = 'siteItems'

  getSiteItemList(): ISiteItemList {
    const result = sessionStorage.getItem(this.key)
    return result ? JSON.parse(result) : []
  }
  setSiteItemList(siteItemList: ISiteItemList) {
    const data = JSON.stringify(siteItemList)
    sessionStorage.setItem(this.key, data)
  }

  toggleSiteStatus(site: ISite) {
    const result = this.getSiteItemList()
    const found = result.find(
      (item) => item.type === SiteItemType.SITE && item.domain === site.domain
    )
    if (!found) return
    ;(found as ISite).isActive = !(found as ISite).isActive
    this.setSiteItemList(result)
  }
  setFilter(filter: IFilter) {
    const data = this.getSiteItemList()
    const found = data.find(
      (item) => item.type === SiteItemType.FILTER && item.name === filter.name
    )
    if (!found) return
    ;(found as IFilter).value = filter.value
  }
}
