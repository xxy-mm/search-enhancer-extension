import invariant from 'tiny-invariant'
import { useEffect, useState } from 'react'

export function useSearchInput() {
  const [searchInput, setSearchInput] = useState<HTMLTextAreaElement>()

  useEffect(() => {
    const searchForm = document.querySelector('form[action="/search"]')
    invariant(searchForm, 'no search form found')
    const searchTextArea = searchForm.querySelector('textarea[name="q"]')
    invariant(searchTextArea, 'no search form found')
    setSearchInput(searchTextArea as HTMLTextAreaElement)
  }, [])

  return {
    searchInput,
  }
}
