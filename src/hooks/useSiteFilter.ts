import { useEffect, useState } from 'react'
import type { ISiteItemList } from '@/models/base'

import { useMessage } from './useMessage'

export function useSiteFilter() {
  const { siteItems } = useMessage()
  const [filtered, setFiltered] = useState<ISiteItemList>([])
  const [filterText, setFilterText] = useState('')
  useEffect(() => {
    let filtered = siteItems
    if (filterText.trim() !== '') {
      filtered = siteItems.filter(
        (item) =>
          (item.type === 'site' && item.domain.includes(filterText)) ||
          (item.type === 'filter' && item.name.includes(filterText))
      )
    }
    setFiltered(filtered)
  }, [filterText, siteItems])

  return {
    filtered,
    filterText,
    setFilterText,
  }
}
