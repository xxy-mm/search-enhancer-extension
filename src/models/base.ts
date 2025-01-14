export type IListViewStyle = 'grouped' | 'compact'
export type ISiteItem = {
  domain: string
  status: SiteItemStatus
}
export type ISiteItemList = ISiteItem[]

export type SiteItemStatus = 'none' | 'include' | 'exclude'

export enum IDataAction {
  CREATE = 'C',
  UPDATE = 'U',
  QUERY = 'R',
  DELETE = 'D',
  UPDATED = 'updated',
}

// messages
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
      data: ISiteItemList
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

export const notifyUpdate = (data: ISiteItemList): IMessage => ({
  type: IDataAction.UPDATED,
  data,
})
