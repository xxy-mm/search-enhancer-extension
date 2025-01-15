import { useEffect, useState } from 'react'
import {
  addMessage,
  removeMessage,
  ISiteItem,
  queryMessage,
  toggleMessage,
  ISiteItemList,
  type IMessage,
  IDataAction,
  type ISiteFilter,
  changeFilterMessage,
} from '@/models/base'

export function useMessage() {
  const [sites, setSites] = useState<ISiteItemList>([])
  const [filters, setFilters] = useState<ISiteFilter[]>([])
  const listener = (message: IMessage) => {
    if (message.type === IDataAction.UPDATED) {
      setSites(message.data.sites)
      setFilters(message.data.filters)
    }
  }
  const add = (item: ISiteItem) => {
    browser.runtime.sendMessage(addMessage(item))
  }

  const remove = (item: ISiteItem) => {
    browser.runtime.sendMessage(removeMessage(item))
  }

  const toggle = (item: ISiteItem) => {
    browser.runtime.sendMessage(toggleMessage(item))
  }

  const changeFilter = (filter: ISiteFilter) => {
    browser.runtime.sendMessage(changeFilterMessage(filter))
  }

  useEffect(() => {
    browser.runtime.sendMessage(queryMessage())
  }, [])

  useEffect(() => {
    browser.runtime.onMessage.addListener(listener)
    return () => browser.runtime.onMessage.removeListener(listener)
  }, [])

  return {
    add,
    remove,
    toggle,
    changeFilter,
    sites,
    filters,
  }
}
