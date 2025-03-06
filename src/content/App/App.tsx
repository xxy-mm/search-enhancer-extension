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
import { useContext, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { IPhoneContext } from '@/hooks/IPhoneProvider'

const App = () => {
  const dispatch = useAppDispatch()
  const { searchInput } = useSearchInput()
  const [hasMultipleRows, setHasMultipleRows] = useState(false)
  const { isIPhone: isIphone, showFilters } = useContext(IPhoneContext)
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
    !isIphone &&
      hasMultipleRows &&
      'hover:bg-base-100/20 hover:max-h-50 overflow-scroll',
    isIphone && showFilters && 'bg-base-100/20 max-h-50 overflow-scroll',
    isIphone && !showFilters && 'hidden'
  )
  return (
    <div
      ref={containerRef}
      className={`rounded overflow-hidden backdrop-blur-sm flex flex-wrap  max-h-6 gap-1 pt-1 pb-1  ${containerClasses} `}
    >
      <button
        className='xxy-btn xxy-btn-xs bg-error xxy-text-primary-content p-1'
        onClick={clear}
        disabled={!shouldClearBtnActive}
      >
        <img
          src={browser.runtime.getURL(deleteIcon)}
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
