import { useEffect, useState } from 'react'

export function useSearchInput() {
  const [searchInput, setSearchInput] = useState<HTMLTextAreaElement>()

  useEffect(() => {
    const searchForm = document.querySelector('form[action="/search"]')
    const searchTextArea =
      (searchForm?.querySelector(
        'textarea[name="q"]'
      ) as HTMLTextAreaElement) ?? undefined
    setSearchInput(searchTextArea)
  }, [])

  return {
    searchInput,
  }
}
