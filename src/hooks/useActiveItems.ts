import { useEffect, useState } from 'react'
import {
  SiteItemType,
  SiteStatus,
  type IFilter,
  type ISite,
} from '@/models/base'

import { useMessage } from './useMessage'

export function useActiveSiteItems() {
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
          if (item.status === SiteStatus.INCLUDE) {
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
