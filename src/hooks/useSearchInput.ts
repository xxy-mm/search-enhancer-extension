import { useEffect, useState } from 'react'

export function useSearchInput() {
  const [searchInput, setSearchInput] = useState<HTMLTextAreaElement | null>(
    null
  )
  const [searchForm, setSearchForm] = useState<HTMLFormElement | null>(null)
  useEffect(() => {
    const searchForm: HTMLFormElement | null = document.querySelector(
      'form[action="/search"]'
    )
    const searchTextArea: HTMLTextAreaElement | null =
      searchForm?.querySelector('textarea[name="q"]') ?? null

    setSearchInput(searchTextArea)
    setSearchForm(searchForm)
  }, [])

  return {
    searchForm,
    searchInput,
  }
}
