export type IListViewStyle = 'grouped' | 'compact'
export type ISiteItem = {
  domain: string
  status: SiteItemStatus
}

export type SiteItemStatus = 'none' | 'include' | 'exclude'

export type IDataAction = 'C' | 'U' | 'R' | 'D'

export type IMessage =
  | {
      type: 'R'
    }
  | {
      type: Exclude<IDataAction, 'R'>
      data: ISiteItem
    }

export const readMessage = (): IMessage => ({ type: 'R' })
export const updateMessage = (data: ISiteItem): IMessage => ({
  type: 'U',
  data,
})
export const deleteMessage = (data: ISiteItem): IMessage => ({
  type: 'D',
  data,
})
export const createMessage = (data: ISiteItem): IMessage => ({
  type: 'C',
  data,
})
