import { useCallback, useEffect } from 'react'
import { SiteItemType, SiteStatus } from '@/models/base'

import { useMessage } from './useMessage'

const siteRegexp = /(-?site:[^\s]+)/gi
const fileRegexp = /(filetype:[^\s]+)/gi

export default function useSearch() {
  const { siteItems } = useMessage()

  const handleCustomSearch = useCallback(
    (event: Event, form: HTMLFormElement, input: HTMLTextAreaElement) => {
      event.preventDefault()
      const filters: string[] = []
      const sitesIncluded: string[] = []
      const sitesExcluded: string[] = []

      siteItems.forEach((item) => {
        if (item.type === SiteItemType.FILTER && item.value !== 'all') {
          filters.push(`filetype:${item.value}`)
        } else if (item.type === SiteItemType.SITE) {
          if (item.status === SiteStatus.EXCLUDE) {
            sitesExcluded.push(`-site:${item.domain}`)
          } else if (item.status === SiteStatus.INCLUDE) {
            sitesIncluded.push(`site:${item.domain}`)
          }
        }
      })

      const originalInput = input.value
      const value = originalInput
        .replace(siteRegexp, '')
        .replace(fileRegexp, '')
        .replace(/OR/g, '')
        .trim()

      const query = [
        value,
        sitesIncluded.join(' OR '),
        sitesExcluded.join(' '),
        filters.join(' OR '),
      ].join(' ')

      console.log('original value', originalInput)
      console.log('query', query)
      input.value = query
      console.log('input value: ', query)

      form.submit()
    },
    [siteItems]
  )

  useEffect(() => {
    function submitListener(event: Event) {
      handleCustomSearch(event, searchForm, searchInput)
    }
    function searchTextAreaListener(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        handleCustomSearch(event, searchForm, searchInput)
      }
    }
    const searchForm = document.querySelector(
      'form[action="/search"]'
    ) as HTMLFormElement
    const searchInput = document.querySelector(
      'textarea[name="q"]'
    ) as HTMLTextAreaElement
    const searchButton = searchForm.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement

    if (!searchButton || !searchInput || !searchButton) return
    searchButton.addEventListener('click', submitListener)
    searchInput.addEventListener('keydown', searchTextAreaListener)
    searchForm.addEventListener('submit', submitListener)

    return () => {
      searchButton.removeEventListener('click', submitListener)
      searchInput.removeEventListener('keydown', searchTextAreaListener)
      searchForm.removeEventListener('submit', submitListener)
    }
  }, [handleCustomSearch])
}
