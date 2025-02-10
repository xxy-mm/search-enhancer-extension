import { useEffect, useState } from 'react'
import { SiteItemType, type IFilter, type ISite } from '@/models/base'

import { useMessage } from './useMessage'

export function useActiveItems() {
  const { siteItems } = useMessage()
  const [fileTypes, setFileTypes] = useState<IFilter[]>([])
  const [includedSites, setIncludedSites] = useState<ISite[]>([])

  useEffect(() => {
    if (siteItems.length > 0) {
      const fileTypeFilters: IFilter[] = []
      const includeSites: ISite[] = []

      siteItems.forEach((item) => {
        if (item.type === SiteItemType.FILTER) {
          if (item.value !== 'all') {
            fileTypeFilters.push(item)
          }
        } else {
          if (item.isActive) {
            includeSites.push(item)
          }
        }
      })

      setFileTypes(fileTypeFilters)
      setIncludedSites(includeSites)
    }
  }, [siteItems])

  return {
    fileTypes,
    includedSites,
  }
}
