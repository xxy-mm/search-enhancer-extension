import { useContext, useEffect } from 'react'
import { getComputedItems } from '@/models/utils'
import { emptySearchConfig } from '@/models/base'
import { ContentContext } from '@/contexts/ContentContext'

import { useSearchInput } from './useSearchInput'

const placeholder = '🔍'
const siteItemRegexp = /(-?site:\S+|filetype:\S+|lr:\S+)(\s+(OR)\s*)?/g

export function useInputSync() {
  const { setSessionConfig, sessionConfig, defaultConfig } =
    useContext(ContentContext)
  const { searchInput, searchForm } = useSearchInput()

  useEffect(() => {
    if (!searchInput) return

    let queryStringArray: string[] = []

    const activeFileFilters: string[] = []
    const activeSites: string[] = []
    const activeLangFilters: string[] = []
    if (sessionConfig) {
      const { filters, sites } = sessionConfig

      filters.forEach((filter) => {
        switch (filter.name) {
          case 'filetype':
            filter.value.split(',').forEach((subType) => {
              activeFileFilters.push(`${filter.name}:${subType}`)
            })
            break
          case 'lr':
            activeLangFilters.push(`${filter.name}:${filter.value}`)
            break
        }
      })

      sites.forEach((site) => {
        activeSites.push(`site:${site.domain}`)
      })

      queryStringArray.push(
        activeLangFilters.join(' OR '),
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

  useEffect(() => {
    if (!searchForm) return
    const onSubmit = (e: Event) => {
      e.preventDefault()
      console.log(e.target)
    }

    searchForm.addEventListener('submit', onSubmit)

    return () => {
      searchForm.removeEventListener('submit', onSubmit)
    }
  }, [searchForm])
}
