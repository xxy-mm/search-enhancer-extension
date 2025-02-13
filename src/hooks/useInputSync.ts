import { useContext, useEffect } from 'react'
import { getComputedItems } from '@/models/utils'
import { emptySearchConfig } from '@/models/base'
import { ContentContext } from '@/contexts/ContentContext'

import { useSearchInput } from './useSearchInput'

const placeholder = '🔍'
const siteItemRegexp = /(-?site:\S+|filetype:\S+)(\s+(OR)\s*)?/g

export function useInputSync() {
  const { setSessionConfig, sessionConfig, defaultConfig } =
    useContext(ContentContext)
  const { searchInput } = useSearchInput()

  useEffect(() => {
    if (!searchInput) return

    let queryStringArray: string[] = []

    const activeFileFilters: string[] = []
    const activeSites: string[] = []

    if (sessionConfig) {
      const { filters, sites } = sessionConfig

      const fileTypeFilter = filters.find(
        (filter) => filter.name === 'filetype'
      )
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
    }

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
      const sessionConfig = defaultConfig
        ? getComputedItems(value, defaultConfig)
        : emptySearchConfig
      setSessionConfig(sessionConfig)
    }

    searchInput.addEventListener('input', searchListener)

    return () => {
      searchInput.removeEventListener('input', searchListener)
    }
  }, [defaultConfig, searchInput, setSessionConfig])
}
