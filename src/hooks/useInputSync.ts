import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  replaceSessionConfig,
  selectSessionConfig,
} from '@/store/sessionConfig.slice'
import { selectAppConfig } from '@/store/appConfig.slice'
import { computeUserInput, getComputedItems } from '@/models/utils'

import { useSearchInput } from './useSearchInput'

export function useInputSync() {
  const dispatch = useDispatch()
  const appConfig = useSelector(selectAppConfig)
  const sessionConfig = useSelector(selectSessionConfig)
  const { searchInput, searchForm } = useSearchInput()
  const isComposing = useRef(false)
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

    const { words } = computeUserInput(searchInput.value)
    queryStringArray.push(words)
    searchInput.value = queryStringArray.join(' ')
  }, [searchInput, sessionConfig])

  useEffect(() => {
    if (!searchInput) return

    function searchListener(e: Event) {
      const input = e.target as HTMLTextAreaElement
      console.log(isComposing.current)
      if (!isComposing.current) {
        const { words, match } = computeUserInput(input.value)
        input.value = match ? match + ' ' + words : words
      }

      const sessionConfig = getComputedItems(input.value, appConfig)
      dispatch(replaceSessionConfig(sessionConfig))
    }
    function onStart() {
      console.log('start')

      isComposing.current = true
    }
    function onEnd(e: Event) {
      console.log('end')
      isComposing.current = false
      searchListener(e)
    }

    searchInput.addEventListener('input', searchListener)
    searchInput.addEventListener('compositionstart', onStart)
    searchInput.addEventListener('compositionend', onEnd)

    return () => {
      searchInput.removeEventListener('input', searchListener)
      searchInput.removeEventListener('compositionstart', onStart)
      searchInput.removeEventListener('compositionend', onEnd)
    }
  }, [appConfig, dispatch, searchInput])

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
