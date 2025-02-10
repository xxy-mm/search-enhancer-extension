import { useEffect } from 'react'
import { getComputedItems } from '@/models/utils'

import { useSessionStorage } from './useSessionStorage'
import { useSearchInput } from './useSearchInput'
import { useMessage } from './useMessage'

const placeholder = '🔍'
const siteItemRegexp = /(-?site:\S+|filetype:\S+)(\s+(OR)\s*)?/g

export function useInputSync() {
  const { searchConfig } = useMessage()
  const { setConfig, searchConfig: sessionSearchConfig } = useSessionStorage()
  const { searchInput } = useSearchInput()

  useEffect(() => {
    if (!searchInput) return

    let queryStringArray: string[] = []

    const activeFileFilters: string[] = []
    const activeSites: string[] = []

    const { filters, sites } = sessionSearchConfig

    const fileTypeFilter = filters.find((filter) => filter.name === 'filetype')
    if (fileTypeFilter) {
      activeFileFilters.push(`filetype:${fileTypeFilter.value}`)
    }

    sites.forEach((site) => {
      activeSites.push(`site:${site.domain}`)
    })

    queryStringArray.push(
      activeFileFilters.join(' OR '),
      activeSites.join(' OR ')
    )

    queryStringArray = queryStringArray.filter((str) => str.length > 0)

    let words = searchInput.value.replace(siteItemRegexp, '').trimStart()
    if (words === '') {
      words = placeholder
    } else if (words.trim() !== placeholder && words.includes(placeholder)) {
      words = words.replace(placeholder, '')
    }
    queryStringArray.push(words)
    searchInput.value = queryStringArray.join(' ')
  }, [searchInput, sessionSearchConfig])

  useEffect(() => {
    if (!searchInput) return

    function searchListener(e: Event) {
      const value = (e.target as HTMLTextAreaElement).value
      const newSiteItems = getComputedItems(value, searchConfig)

      setConfig(newSiteItems)
    }

    searchInput.addEventListener('input', searchListener)

    return () => {
      searchInput.removeEventListener('input', searchListener)
    }
  }, [searchConfig, searchInput, setConfig])
}
