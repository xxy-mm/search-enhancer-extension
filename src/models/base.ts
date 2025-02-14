export type IFilterOption = {
  label: string
  value: string
}
export type IFilterOptions = IFilterOption[]

export type ISite = {
  domain: string
  isActive: boolean
}
export type IFilter = {
  name: 'filetype'
  value: string
  options: IFilterOptions
}

export type ISessionFilter = Pick<IFilter, 'name' | 'value'>
export type ISessionSite = Pick<ISite, 'domain'>
export type ISessionSearchConfig = {
  filters: ISessionFilter[]
  sites: ISessionSite[]
}
export interface ISearchConfig {
  filters: IFilter[]
  sites: ISite[]
}

export const FILTER_OPTION_DEFAULT = 'all'
// filter options
export const FILETYPE_FILTER_OPTIONS: IFilterOptions = [
  { label: 'All File Types', value: FILTER_OPTION_DEFAULT },
  { label: 'PDF(.pdf)', value: 'pdf' },
  { label: 'Word(.doc,.docx)', value: 'doc,docx' },
  { label: 'Excel(.xls,.xlsx)', value: 'xls,xlsx' },
  { label: 'PPT(.ppt,.pptx)', value: 'ppt,pptx' },
  { label: 'Adobe Postscript(.ps)', value: 'ps' },
  { label: 'Rich Text Format(.rtf)', value: 'rtf' },
  { label: 'Google Earth KML(.kml)', value: 'kml' },
]

// messages
export enum IDataAction {
  // curd messages are post from popup
  CREATE_SITE = 'create site',
  QUERY = 'query',
  DELETE_SITE = 'delete site',
  // updated message is post from background
  UPDATED = 'updated',
  UPDATE_ALL = 'updateAll',
  SORT_SITES = 'sort sites',
}

export type IMessage =
  | {
      type: IDataAction.QUERY
    }
  | {
      type: IDataAction.CREATE_SITE | IDataAction.DELETE_SITE
      data: ISite
    }
  | {
      type: IDataAction.UPDATED
      data: {
        searchConfig: ISearchConfig
      }
    }
  | {
      type: IDataAction.UPDATE_ALL
      data: ISearchConfig
    }
  | {
      type: IDataAction.SORT_SITES
      data: ISite[]
    }

// message creator
export const queryMessage = (): IMessage => ({ type: IDataAction.QUERY })

export const removeSiteMessage = (site: ISite): IMessage => ({
  type: IDataAction.DELETE_SITE,
  data: site,
})
export const addSiteMessage = (site: ISite): IMessage => ({
  type: IDataAction.CREATE_SITE,
  data: site,
})

export const notifyUpdate = (searchConfig: ISearchConfig): IMessage => ({
  type: IDataAction.UPDATED,
  data: {
    searchConfig,
  },
})

export const updateAllMessage = (searchConfig: ISearchConfig): IMessage => ({
  type: IDataAction.UPDATE_ALL,
  data: searchConfig,
})
export const sortSitesMessage = (sites: ISite[]): IMessage => ({
  type: IDataAction.SORT_SITES,
  data: sites,
})

export const emptySearchConfig: Readonly<ISearchConfig> = {
  filters: [],
  sites: [],
}
