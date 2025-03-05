import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { isEqual } from '@/models/utils'
import { FILTER_OPTION_DEFAULT, type IFilter, type ISite } from '@/models/base'

import type { RootState } from './store'
import type { IAppConfig } from './appConfig.slice'

export interface ISessionConfig {
  filters: IFilter[]
  sites: ISite[]
}

const initialState: ISessionConfig = {
  filters: [],
  sites: [],
}

export const sessionConfigSlice = createSlice({
  name: 'sessionConfig',
  initialState,
  reducers: {
    updateSessionSite: (state, action: PayloadAction<ISite>) => {
      const site = action.payload
      const index = state.sites.findIndex((s) => s.domain === site.domain)
      const found = index !== -1
      if (found) {
        state.sites.splice(index, 1)
      } else {
        state.sites.push({ ...site, isActive: true })
      }
    },
    updateSessionFilter: (state, action: PayloadAction<IFilter>) => {
      const filter = action.payload
      const index = state.filters.findIndex((f) => f.name === filter.name)
      const found = index !== -1
      if (filter.value === FILTER_OPTION_DEFAULT) {
        if (found) state.filters.splice(index, 1)
      } else {
        if (found) state.filters[index].value = filter.value
        else state.filters.push(filter)
      }
    },
    replaceSessionConfig: (state, action: PayloadAction<ISessionConfig>) => {
      if (!isEqual(state, action.payload)) {
        return action.payload
      } else {
        return state
      }
    },
    resetSessionConfig: () => {
      return initialState
    },

    pureSessionConfig: (state, action: PayloadAction<IAppConfig>) => {
      const { sites, filters } = action.payload
      state.sites = state.sites.filter((ss) =>
        sites.some((s) => s.domain === ss.domain)
      )
      state.filters = state.filters.filter((sf) =>
        filters.some((f) => f.name === sf.name)
      )
    },
  },
})

export const {
  updateSessionSite,
  updateSessionFilter,
  resetSessionConfig,
  replaceSessionConfig,
  pureSessionConfig,
} = sessionConfigSlice.actions
export const selectSessionConfig = (state: RootState) => state.sessionConfig
export default sessionConfigSlice.reducer
