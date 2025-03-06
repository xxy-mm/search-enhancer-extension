import { useSelector } from 'react-redux'

import { selectComputedConfig, useAppDispatch } from '@/store/store'
import {
  resetSessionConfig,
  selectSessionConfig,
  updateSessionFilter,
  updateSessionSite,
} from '@/store/sessionConfig.slice'

import { type IFilter, type ISite } from '@/models/base'
import { useSearchInput } from '@/hooks/useSearchInput'

import { useInputSync } from '@/hooks/useInputSync'
import { useInit } from '@/hooks/useInit'

import deleteIcon from '@/assets/images/delete.svg'

import { SiteItem } from '@/components/SiteItem'
import { Select } from '@/components/Select'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

const App = () => {
  const dispatch = useAppDispatch()
  const { searchInput } = useSearchInput()
  const [hasMultipleRows, setHasMultipleRows] = useState(false)

  useInputSync()
  useInit()
  const containerRef = useRef<HTMLDivElement>(null)

  const { filters, sites } = useSelector(selectComputedConfig)
  const { filters: sessionFilters, sites: sessionSites } =
    useSelector(selectSessionConfig)

  const shouldClearBtnActive =
    sessionFilters.length > 0 || sessionSites.length > 0

  const focusInput = () => {
    if (searchInput) {
      searchInput.focus()
      searchInput.scrollTop = searchInput.scrollHeight
    }
  }
  const clear = () => {
    dispatch(resetSessionConfig())
    focusInput()
  }
  const onFilterChange = (filter: IFilter) => {
    dispatch(updateSessionFilter(filter))
    focusInput()
  }

  const onSiteChange = (site: ISite) => {
    dispatch(updateSessionSite(site))
    focusInput()
  }

  useEffect(() => {
    const containerElement = containerRef.current
    if (!containerElement) return
    const checkOverflow = () => {
      const hasOverflow = containerElement.scrollHeight > 26
      setHasMultipleRows(hasOverflow)
    }

    checkOverflow()
    const resizeObserver = new ResizeObserver(checkOverflow)

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.unobserve(containerElement)
    }
  }, [filters, sites])

  const containerClasses = clsx(
    hasMultipleRows && 'hover:bg-base-100/20 backdrop-blur-sm '
  )
  return (
    <div
      ref={containerRef}
      className={`rounded overflow-hidden flex flex-wrap max-h-6 gap-1 pt-1 pb-1 hover:max-h-max ${containerClasses} `}
    >
      <button
        className='xxy-btn xxy-btn-xs bg-error xxy-text-primary-content p-1'
        onClick={clear}
        disabled={!shouldClearBtnActive}
      >
        <img
          src={chrome.runtime.getURL(deleteIcon)}
          className='w-3'
        />
      </button>
      {filters.map((filter) => {
        return (
          <Select
            key={filter.name}
            options={filter.options}
            onChange={(value) => onFilterChange({ ...filter, value })}
            value={filter.value}
          />
        )
      })}

      {sites.map((site) => (
        <SiteItem
          key={site.domain}
          site={site}
          toggleSite={onSiteChange}
        />
      ))}
    </div>
  )
}

export default App
