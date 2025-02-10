import { useEffect, useState } from 'react'
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

  const updateSite = (site: ISite) => {
    manager.updateSite(site)
    const config = manager.getSearchConfig()
    setSessionConfig(config)
  }

  const updateFilter = (filter: IFilter) => {
    manager.updateFilter(filter)
    const config = manager.getSearchConfig()
    setSessionConfig(config)
  }

  const setConfig = (config: ISearchConfig) => {
    manager.setConfig(config)
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
    console.log('setcomputedconfig')
    if (!searchConfig) return

    const { filters, sites } = searchConfig

    const { filters: sessionFilters, sites: sessionSites } = sessionConfig
    sessionFilters.forEach((sf) => {
      const foundFilter = filters.find((f) => sf.name === f.name)
      if (foundFilter) {
        foundFilter.value = sf.value
      }
    })
    sessionSites.forEach((ss) => {
      const foundSite = sites.find((s) => ss.domain === s.domain)
      if (foundSite) {
        foundSite.isActive = true
      }
    })
    setComputedConfig({ filters, sites })
  }, [searchConfig, sessionConfig])
  return {
    searchConfig: computedConfig,
    updateFilter,
    updateSite,
    setConfig,
    reset,
  }
}
