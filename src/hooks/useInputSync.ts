import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  replaceSessionConfig,
  selectSessionConfig,
} from '@/store/sessionConfig.slice'
import { selectAppConfig } from '@/store/appConfig.slice'
import { getComputedItems } from '@/models/utils'

import { useSearchInput } from './useSearchInput'

const placeholder = '🔍'
const siteItemRegexp = /(-?site:\S+|filetype:\S+|lr:\S+)(\s+(OR)\s*)?/g

export function useInputSync() {
  const dispatch = useDispatch()
  const appConfig = useSelector(selectAppConfig)
  const sessionConfig = useSelector(selectSessionConfig)
  const { searchInput, searchForm } = useSearchInput()

  useEffect(() => {
    if (!searchInput) return
    let queryStringArray: string[] = []
    const activeFileFilters: string[] = []
    const activeSites: string[] = []
    const activeLangFilters: string[] = []
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
      const sessionConfig = getComputedItems(value, appConfig)
      dispatch(replaceSessionConfig(sessionConfig))
    }

    searchInput.addEventListener('input', searchListener)

    return () => {
      searchInput.removeEventListener('input', searchListener)
    }
  }, [appConfig, dispatch, searchInput, sessionConfig])

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
