import { useCallback, useEffect } from 'react'
import { hasChanged } from '@/models/utils'
import {
  IFilterName,
  SiteItemType,
  SiteStatus,
  type IFilter,
  type ISite,
  type ISiteItemList,
} from '@/models/base'

import { useMessage } from './useMessage'

const fileTypeRegexp = /filetype:([^\s]+)/gi
const includedSiteRegexp = /[^-]site:([^\s]+)/gi
const excludedSiteRegexp = /-site:([^\s]+)/gi
const siteItemRegexp = /(-?site:\S+|filetype:\S+)(\s+(OR)\s*)?/g

export function useInputSync() {
  const { updateSiteItems, siteItems } = useMessage()

  const getComputedItems = useCallback(
    (value: string, items: ISiteItemList) => {
      console.log('effect run: getComputedItems')
      if (items.length < 1) return

      const copy = [...items].map((item) => {
        if (item.type === SiteItemType.FILTER) {
          item.value = 'all'
        } else {
          item.status = SiteStatus.NONE
        }
        return item
      })
      const included = value.matchAll(includedSiteRegexp) || []
      const excluded = value.matchAll(excludedSiteRegexp) || []
      const fileTypes = value.matchAll(fileTypeRegexp) || []

      for (const match of included) {
        const domain = match[1]
        const found = copy.find(
          (item) => item.type === SiteItemType.SITE && item.domain === domain
        ) as ISite
        if (!found) continue
        found.status = SiteStatus.INCLUDE
      }
      for (const match of excluded) {
        const domain = match[1]
        const found = copy.find(
          (item) => item.type === SiteItemType.SITE && item.domain === domain
        ) as ISite
        if (!found) continue
        found.status = SiteStatus.EXCLUDE
      }
      for (const match of fileTypes) {
        const fileType = match[1]
        const found = copy.find(
          (item) =>
            item.type === SiteItemType.FILTER &&
            item.name === IFilterName.FILE_TYPE
        ) as IFilter
        if (!found) continue
        found.value = fileType
      }

      if (hasChanged(items, copy)) {
        return copy
      }
    },
    []
  )

  useEffect(() => {
    const activeItems = siteItems.filter((item) => {
      if (item.type === SiteItemType.FILTER) {
        return item.value !== 'all'
      } else {
        return item.status !== SiteStatus.NONE
      }
    })
    const filterString: string[] = []
    if (activeItems.length) {
      const fileTypeFilters: string[] = []
      const includeSites: string[] = []
      const excludedSites: string[] = []
      activeItems.forEach((item) => {
        if (item.type === SiteItemType.FILTER) {
          fileTypeFilters.push(`filetype:${item.value}`)
        } else {
          if (item.status === SiteStatus.INCLUDE) {
            includeSites.push(`site:${item.domain}`)
          } else {
            excludedSites.push(`-site:${item.domain}`)
          }
        }
      })
      filterString.push(
        ' ' + fileTypeFilters.join(' OR '),
        ' ' + includeSites.join(' OR '),
        ' ' + excludedSites.join(' ')
      )
    }

    const searchForm = document.querySelector(
      'form[action="/search"]'
    ) as HTMLFormElement
    const searchTextArea = searchForm.querySelector(
      'textarea[name="q"]'
    ) as HTMLTextAreaElement
    filterString.push(searchTextArea.value.replace(siteItemRegexp, ''))
    searchTextArea.value = filterString.join('')
  }, [siteItems])

  useEffect(() => {
    console.log('effect run: add search event')
    function searchListener(e: Event) {
      const value = (e.target as HTMLTextAreaElement).value
      const newSiteItems = getComputedItems(value, siteItems)
      if (newSiteItems) {
        updateSiteItems(newSiteItems)
      }
    }
    const searchForm = document.querySelector(
      'form[action="/search"]'
    ) as HTMLFormElement
    const searchTextArea = searchForm.querySelector(
      'textarea[name="q"]'
    ) as HTMLTextAreaElement

    searchTextArea.addEventListener('input', searchListener)
    searchTextArea.addEventListener('change', searchListener)

    return () => {
      searchTextArea.removeEventListener('input', searchListener)
      searchTextArea.removeEventListener('change', searchListener)
    }
  }, [getComputedItems, siteItems, updateSiteItems])
}
