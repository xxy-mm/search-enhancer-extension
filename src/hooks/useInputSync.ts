import { useEffect } from 'react'
import { getComputedItems } from '@/models/utils'

import { useSearchInput } from './useSearchInput'
import { useMessage } from './useMessage'
import { useActiveItems } from './useActiveItems'

const placeholder = '🔍'
const siteItemRegexp = /(-?site:\S+|filetype:\S+)(\s+(OR)\s*)?/g

export function useInputSync() {
  const { updateSiteItems, siteItems, resetSiteItems } = useMessage()
  const { searchInput } = useSearchInput()
  const { fileTypes, includedSites } = useActiveItems()
  useEffect(() => {
    if (!searchInput) return

    let queryStringArray: string[] = []

    const fileTypeFilters: string[] = []
    const included: string[] = []
    fileTypes.forEach((item) => {
      const types = item.value.split(',')
      types.forEach((t) => fileTypeFilters.push(`filetype:${t}`))
    })
    includedSites.forEach((item) => {
      included.push(`site:${item.domain}`)
    })

    queryStringArray.push(fileTypeFilters.join(' OR '), included.join(' OR '))

    queryStringArray = queryStringArray.filter((str) => str.length > 0)

    let words = searchInput.value.replace(siteItemRegexp, '').trimStart()
    if (words === '') {
      words = placeholder
    } else if (words.trim() !== placeholder && words.includes(placeholder)) {
      words = words.replace(placeholder, '')
    }
    queryStringArray.push(words)
    searchInput.value = queryStringArray.join(' ')
  }, [resetSiteItems, searchInput, includedSites, fileTypes])

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
