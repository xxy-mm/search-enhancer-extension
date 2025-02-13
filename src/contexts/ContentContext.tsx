import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import {
  emptySearchConfig,
  FILTER_OPTION_DEFAULT,
  type IFilter,
  type ISearchConfig,
  type ISessionSearchConfig,
  type ISite,
} from '@/models/base'
import { useSessionStorage } from '@/hooks/useSessionStorage'
import { useMessage } from '@/hooks/useMessage'

interface IContextContext {
  updateSite: (site: ISite) => void
  updateFilter: (filter: IFilter) => void
  setSessionConfig: (config: ISessionSearchConfig) => void
  reset: () => void
  defaultConfig: ISearchConfig
  computedConfig: ISearchConfig
  sessionConfig: ISessionSearchConfig
}
export const ContentContext = createContext<IContextContext>(
  {} as IContextContext
)

export const ContentContextProvider = ({ children }: PropsWithChildren) => {
  const { searchConfig } = useMessage()
  const { sessionConfig, setSessionConfig, updateFilter, updateSite, reset } =
    useSessionStorage(emptySearchConfig)
  const [computedConfig, setComputedConfig] =
    useState<ISearchConfig>(emptySearchConfig)

  const value = useMemo(
    () => ({
      defaultConfig: searchConfig,
      computedConfig,
      sessionConfig,
      setSessionConfig,
      updateFilter,
      updateSite,
      reset,
    }),
    [
      computedConfig,
      reset,
      searchConfig,
      sessionConfig,
      setSessionConfig,
      updateFilter,
      updateSite,
    ]
  )

  // use the default config and session config to compute the filter's status
  // and then show them in the UI with correct states
  useEffect(() => {
    if (!searchConfig) return

    const { filters, sites } = searchConfig

    if (!sessionConfig) {
      setComputedConfig(searchConfig)
      return
    }
    const { filters: sessionFilters, sites: sessionSites } = sessionConfig

    const computedFilters: IFilter[] = filters.map((f) => {
      const found = sessionFilters.find((sf) => sf.name === f.name)
      return { ...f, value: found ? found.value : FILTER_OPTION_DEFAULT }
    })
    const computedSites: ISite[] = sites.map((s) => {
      const found = sessionSites.find((ss) => ss.domain === s.domain)
      return { ...s, isActive: found ? true : false }
    })
    const computedConfig = { filters: computedFilters, sites: computedSites }
    setComputedConfig(computedConfig)
  }, [searchConfig, sessionConfig])

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  )
}
