import {
  type ISiteFilter,
  type ISiteItem,
  type ISiteItemList,
} from '../models/base'

export interface IDataContext {
  addSite: (site: ISiteItem) => void
  removeSite: (site: ISiteItem) => void
  toggleSiteStatus: (site: ISiteItem) => void
  sites: ISiteItemList
  changeFilter: (filter: ISiteFilter) => void
  filters: ISiteFilter[]
}
