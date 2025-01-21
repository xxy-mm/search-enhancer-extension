import { useContext, useEffect, useState } from 'react'
import type { ISiteItemList } from '@/models/base'
import { DataMessageContext } from '@/contexts/DataMessageContextProvider'

export function useSearch() {
  const { siteItems } = useContext(DataMessageContext)
  const [filtered, setFiltered] = useState<ISiteItemList>([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    let filtered = siteItems
    if (search.trim() !== '') {
      filtered = siteItems.filter(
        (item) =>
          (item.type === 'site' && item.domain.includes(search)) ||
          (item.type === 'filter' && item.name.includes(search))
      )
    }
    setFiltered(filtered)
  }, [search, siteItems])

  return {
    filtered,
    search,
    setSearch,
  }
}
