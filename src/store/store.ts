import storage from 'redux-persist/lib/storage/session'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { useDispatch, useSelector } from 'react-redux'
import {
  combineReducers,
  configureStore,
  createSelector,
} from '@reduxjs/toolkit'

import sessionConfigReducer, {
  selectSessionConfig,
} from './sessionConfig.slice'
import appConfigReducer, {
  selectAppConfig,
  type IAppConfig,
} from './appConfig.slice'

// MARK: redux-persist
export const sessionStorageKey = '__SEARCH_ENHANCER__'
const persistConfig = {
  key: sessionStorageKey,
  version: 1,
  storage,
  stateReconciler: hardSet,
}
const rootReducer = combineReducers({
  sessionConfig: persistReducer(persistConfig, sessionConfigReducer),
  appConfig: appConfigReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>

export const selectComputedConfig = createSelector(
  [selectAppConfig, selectSessionConfig],
  (appConfig, sessionConfig): IAppConfig => {
    const filters = appConfig.filters.map((f) => {
      const foundInSession = sessionConfig.filters.find(
        (sf) => sf.name === f.name
      )
      return {
        ...f,
        value: foundInSession ? foundInSession.value : f.value,
      }
    })
    const sites = appConfig.sites.map((s) => {
      const foundInSession = sessionConfig.sites.find(
        (ss) => ss.domain === s.domain
      )
      return {
        ...s,
        isActive: foundInSession ? foundInSession.isActive : s.isActive,
      }
    })

    return {
      filters,
      sites,
    }
  }
)
