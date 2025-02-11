import { useCallback, useEffect, useState } from 'react'
import { SessionStorageManager } from '@/models/sessionStorageManager'
import {
  emptySearchConfig,
  ISearchConfig,
  type IFilter,
  type ISite,
} from '@/models/base'

import { useMessage } from './useMessage'

const manager = new SessionStorageManager()

export function useSessionStorage() {
  const { searchConfig } = useMessage()
  const [sessionConfig, setSessionConfig] =
    useState<ISearchConfig>(emptySearchConfig)
  const [computedConfig, setComputedConfig] =
    useState<ISearchConfig>(emptySearchConfig)

  const updateSite = useCallback((site: ISite) => {
    manager.updateSite(site)
    const config = manager.getSearchConfig()
    console.log('config', config)
    setSessionConfig(config)
  }, [])

  const updateFilter = (filter: IFilter) => {
    manager.updateFilter(filter)
    const config = manager.getSearchConfig()
    setSessionConfig(config)
  }

  const setConfig = (config: ISearchConfig) => {
    manager.setSearchConfig(config)
    setSessionConfig(config)
  }

  const reset = () => {
    manager.reset()
    setSessionConfig(emptySearchConfig)
  }

  useEffect(() => {
    setSessionConfig(manager.getSearchConfig())
  }, [])

  useEffect(() => {
    if (!searchConfig) return

    const { filters, sites } = searchConfig

    const { filters: sessionFilters, sites: sessionSites } = sessionConfig

    const computedFilters: IFilter[] = filters.map((f) => {
      const found = sessionFilters.find((sf) => sf.name === f.name)
      return found ? { ...found } : { ...f }
    })
    const computedSites: ISite[] = sites.map((s) => {
      const found = sessionSites.find((ss) => ss.domain === s.domain)
      return found ? { ...found } : { ...s }
    })
    const computedConfig = { filters: computedFilters, sites: computedSites }
    setComputedConfig(computedConfig)
  }, [searchConfig, sessionConfig])
  return {
    sessionConfig,
    computedConfig,
    updateFilter,
    updateSite,
    setSessionConfig: setConfig,
    reset,
    searchConfig,
  }
}
