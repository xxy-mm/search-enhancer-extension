import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { FILTER_OPTION_DEFAULT, type IFilter, type ISite } from '@/models/base'

import type { RootState } from './store'

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
      if (!site.isActive) {
        if (found) state.sites.splice(index, 1)
      } else if (site.isActive) {
        if (!found) state.sites.push(site)
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
      return action.payload
    },
    resetSessionConfig: () => {
      return initialState
    },
  },
})

export const {
  updateSessionSite,
  updateSessionFilter,
  resetSessionConfig,
  replaceSessionConfig,
} = sessionConfigSlice.actions
export const selectSessionConfig = (state: RootState) => state.sessionConfig
export default sessionConfigSlice.reducer
