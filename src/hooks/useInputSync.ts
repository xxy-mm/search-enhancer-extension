import { useEffect } from 'react'
import { getComputedItems } from '@/models/utils'
import { reset, SiteItemType, SiteStatus } from '@/models/base'

import { useMessage } from './useMessage'

const siteItemRegexp = /(-?site:\S+|filetype:\S+)(\s+(OR)\s*)?/g

export function useInputSync() {
  const { updateSiteItems, siteItems, resetSiteItems } = useMessage()

  useEffect(() => {
    const activeItems = siteItems.filter((item) => {
      if (item.type === SiteItemType.FILTER) {
        return item.value !== 'all'
      } else {
        return item.status !== SiteStatus.NONE
      }
    })
    let queryStringArray: string[] = []
    if (activeItems.length) {
      const fileTypeFilters: string[] = []
      const includeSites: string[] = []

      activeItems.forEach((item) => {
        if (item.type === SiteItemType.FILTER) {
          fileTypeFilters.push(`filetype:${item.value}`)
        } else {
          if (item.status === SiteStatus.INCLUDE) {
            includeSites.push(`site:${item.domain}`)
          }
        }
      })
      queryStringArray.push(
        fileTypeFilters.join(' OR '),
        includeSites.join(' OR ')
      )
    }
    queryStringArray = queryStringArray.filter((str) => str.length > 0)
    const searchForm = document.querySelector(
      'form[action="/search"]'
    ) as HTMLFormElement
    const searchTextArea = searchForm.querySelector(
      'textarea[name="q"]'
    ) as HTMLTextAreaElement
    const words = searchTextArea.value.replace(siteItemRegexp, '').trimStart()
    if (words === '' && activeItems.length > 0) {
      return
    } else {
      queryStringArray.push(words)
      searchTextArea.value = queryStringArray.join(' ')
    }
  }, [resetSiteItems, siteItems])

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

    return () => {
      searchTextArea.removeEventListener('input', searchListener)
    }
  }, [siteItems, updateSiteItems])
}
