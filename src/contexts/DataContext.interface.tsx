import { type IFilter, type ISite, type ISiteItemList } from '../models/base'

export interface IDataContext {
  addSite: (site: ISite) => void
  removeSite: (site: ISite) => void
  toggleSite: (site: ISite) => void
  siteItems: ISiteItemList
  changeFilter: (filter: IFilter) => void
  sort: (siteItems: ISiteItemList) => void
}
