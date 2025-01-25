export enum IFilterName {
  FILE_TYPE = 'File Type',
}

export type IFilterOption = {
  label: string
  value: string
}
export type IFilterOptions = IFilterOption[]
export enum SiteItemType {
  SITE = 'site',
  FILTER = 'filter',
}
export type ISite = {
  type: SiteItemType.SITE
  domain: string
  status: SiteStatus
}
export type IFilter = {
  type: SiteItemType.FILTER
  name: IFilterName
  value: string
  options: IFilterOptions
}

export type ISiteItem = ISite | IFilter

export type ISiteItemList = ISiteItem[]

export enum SiteStatus {
  NONE = 'No Effect',
  INCLUDE = 'Included',
  EXCLUDE = 'Excluded',
}

// filter options
export const FILETYPE_FILTER_OPTIONS: IFilterOptions = [
  { label: 'File Type', value: 'all' },
  { label: 'PDF', value: 'pdf' },
  { label: 'WORD', value: 'doc' },
  { label: 'EXCEL', value: 'xls' },
  { label: 'PPT', value: 'ppt' },
]

// messages
export enum IDataAction {
  // curd messages are post from popup
  CREATE_SITE = 'create site',
  UPDATE_SITE = 'update site',
  QUERY = 'query',
  DELETE_SITE = 'delete site',
  UPDATE_FILTER = 'update filter',
  SORT = 'sort',
  // updated message is post from background
  UPDATED = 'updated',
}

export type IMessage =
  | {
      type: IDataAction.QUERY
    }
  | {
      type:
        | IDataAction.CREATE_SITE
        | IDataAction.DELETE_SITE
        | IDataAction.UPDATE_SITE
      data: ISite
    }
  | {
      type: IDataAction.UPDATED
      data: {
        siteItems: ISiteItemList
      }
    }
  | {
      type: IDataAction.UPDATE_FILTER
      data: IFilter
    }
  | {
      type: IDataAction.SORT
      data: ISiteItemList
    }

// message creator
export const queryMessage = (): IMessage => ({ type: IDataAction.QUERY })
export const toggleSiteMessage = (site: ISite): IMessage => ({
  type: IDataAction.UPDATE_SITE,
  data: site,
})
export const removeSiteMessage = (site: ISite): IMessage => ({
  type: IDataAction.DELETE_SITE,
  data: site,
})
export const addSiteMessage = (site: ISite): IMessage => ({
  type: IDataAction.CREATE_SITE,
  data: site,
})

export const notifyUpdate = (siteItems: ISiteItemList): IMessage => ({
  type: IDataAction.UPDATED,
  data: {
    siteItems,
  },
})

export const changeFilterMessage = (filter: IFilter): IMessage => ({
  type: IDataAction.UPDATE_FILTER,
  data: filter,
})

export const sortMessage = (siteItems: ISiteItemList): IMessage => ({
  type: IDataAction.SORT,
  data: siteItems,
})
