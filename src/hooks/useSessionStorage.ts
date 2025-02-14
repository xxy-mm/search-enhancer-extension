import { useCallback, useEffect, useState } from 'react'
import { SessionStorageManager } from '@/models/sessionStorageManager'
import {
  emptySearchConfig,
  ISessionSearchConfig,
  type IFilter,
  type ISite,
} from '@/models/base'

const manager = new SessionStorageManager()

export function useSessionStorage(defaultConfig: ISessionSearchConfig) {
  const [sessionConfig, setSessionConfig] =
    useState<ISessionSearchConfig>(defaultConfig)

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

  const setConfig = useCallback((config: ISessionSearchConfig) => {
    manager.setSearchConfig(config)
    setSessionConfig(config)
  }, [])

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
