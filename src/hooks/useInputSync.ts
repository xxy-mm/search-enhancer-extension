import { useEffect } from 'react'
import { getComputedItems } from '@/models/utils'

import { useSessionStorage } from './useSessionStorage'
import { useSearchInput } from './useSearchInput'

const placeholder = '🔍'
const siteItemRegexp = /(-?site:\S+|filetype:\S+)(\s+(OR)\s*)?/g

export function useInputSync() {
  const {
    searchConfig,
    setSessionConfig,
    sessionConfig,
    computedConfig,
    updateFilter,
    updateSite,
    reset,
  } = useSessionStorage()
  const { searchInput } = useSearchInput()

  console.log('sessionSearchConfig', sessionConfig)
  // BUG: filters does not sync with search input values
  useEffect(() => {
    if (!searchInput) return

    let queryStringArray: string[] = []

    const activeFileFilters: string[] = []
    const activeSites: string[] = []

    const { filters, sites } = sessionConfig

    const fileTypeFilter = filters.find((filter) => filter.name === 'filetype')
    if (fileTypeFilter && fileTypeFilter.value !== 'all') {
      activeFileFilters.push(`filetype:${fileTypeFilter.value}`)
    }

    sites.forEach((site) => {
      if (site.isActive) {
        activeSites.push(`site:${site.domain}`)
      }
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
  }, [searchInput, sessionConfig])

  useEffect(() => {
    if (!searchInput) return

    function searchListener(e: Event) {
      const value = (e.target as HTMLTextAreaElement).value
      const sessionConfig = getComputedItems(value, searchConfig)
      setSessionConfig(sessionConfig)
    }

    searchInput.addEventListener('input', searchListener)

    return () => {
      searchInput.removeEventListener('input', searchListener)
    }
  }, [searchConfig, searchInput, setSessionConfig])

  return {
    computedConfig,
    updateFilter,
    updateSite,
    searchConfig,
    reset,
  }
}
