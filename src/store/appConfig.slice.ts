import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IFilter, type ISite } from '@/models/base'

import type { RootState } from './store'

export interface IAppConfig {
  filters: IFilter[]
  sites: ISite[]
}

const initialState: IAppConfig = {
  filters: [],
  sites: [],
}

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setAppConfig: (_, action: PayloadAction<IAppConfig>) => {
      return action.payload
    },
  },
})

export const { setAppConfig } = appConfigSlice.actions
export const selectAppConfig = (state: RootState) => state.appConfig
export default appConfigSlice.reducer
