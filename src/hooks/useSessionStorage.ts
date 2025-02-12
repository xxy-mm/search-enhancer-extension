import { useCallback, useEffect, useState } from 'react'
import { SessionStorageManager } from '@/models/sessionStorageManager'
import {
  emptySearchConfig,
  ISearchConfig,
  type IFilter,
  type ISite,
} from '@/models/base'

const manager = new SessionStorageManager()

export function useSessionStorage(defaultConfig: ISearchConfig) {
  const [sessionConfig, setSessionConfig] =
    useState<ISearchConfig>(defaultConfig)

  const updateSite = useCallback((site: ISite) => {
    manager.updateSite(site)
    const config = manager.getSearchConfig()
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

  return {
    sessionConfig,
    updateFilter,
    updateSite,
    setSessionConfig: setConfig,
    reset,
  }
}
