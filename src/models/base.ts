export type IListViewStyle = 'grouped' | 'compact'

// site item
export type ISiteItem = {
  domain: string
  status: ISiteItemStatus
}
export type ISiteItemList = ISiteItem[]

export type ISiteItemStatus = 'none' | 'include' | 'exclude'
// filters
export enum IFilterType {
  FILE_TYPE,
}
export type IFilterOption = {
  label: string
  value: string
}
export type ISiteFilter = {
  type: IFilterType
  value: string
  options: IFilterOption[]
}

// file type filter

export type IFileType = 'all' | 'pdf' | 'doc' | 'xls' | 'ppt'
export const fileTypeFilterOptions: IFilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'PDF', value: 'pdf' },
  { label: 'WORD', value: 'doc' },
  { label: 'EXCEL', value: 'xls' },
  { label: 'PPT', value: 'ppt' },
]

// messages
export enum IDataAction {
  CREATE = 'create',
  UPDATE = 'update',
  QUERY = 'query',
  DELETE = 'delete',
  UPDATED = 'updated',
  UPDATE_FILTER = 'update_filter',
}

export type IUpdatedData = {
  sites: ISiteItemList
  filters: ISiteFilter[]
}
export type IMessage =
  | {
      type: IDataAction.QUERY
    }
  | {
      type: IDataAction.CREATE | IDataAction.DELETE | IDataAction.UPDATE
      data: ISiteItem
    }
  | {
      type: IDataAction.UPDATED
      data: {
        sites: ISiteItemList
        filters: ISiteFilter[]
      }
    }
  | {
      type: IDataAction.UPDATE_FILTER
      data: ISiteFilter
    }

// message creator
export const queryMessage = (): IMessage => ({ type: IDataAction.QUERY })
export const toggleMessage = (data: ISiteItem): IMessage => ({
  type: IDataAction.UPDATE,
  data,
})
export const removeMessage = (data: ISiteItem): IMessage => ({
  type: IDataAction.DELETE,
  data,
})
export const addMessage = (data: ISiteItem): IMessage => ({
  type: IDataAction.CREATE,
  data,
})

export const notifyUpdate = (data: IUpdatedData): IMessage => ({
  type: IDataAction.UPDATED,
  data,
})

export const changeFilterMessage = (filter: ISiteFilter): IMessage => ({
  type: IDataAction.UPDATE_FILTER,
  data: filter,
})
