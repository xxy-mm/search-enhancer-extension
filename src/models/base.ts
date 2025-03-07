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
  name: 'filetype' | 'lr'
  value: string
  options: IFilterOptions
}

export interface ISearchConfig {
  filters: IFilter[]
  sites: ISite[]
}

export const FILTER_OPTION_DEFAULT = 'all'

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
