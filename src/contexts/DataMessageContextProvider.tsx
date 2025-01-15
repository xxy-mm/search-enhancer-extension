import { createContext } from 'react'
import * as React from 'react'

import { useMessage } from './useMessage'
import { IDataContext } from './DataContext.interface'

export const DataMessageContext = createContext<IDataContext>(
  {} as IDataContext
)

const DataMessageContextProvider = ({ children }: React.PropsWithChildren) => {
  const { add, remove, toggle, sites, changeFilter, filters } = useMessage()

  return (
    <DataMessageContext.Provider
      value={{
        addSite: add,
        removeSite: remove,
        toggleSiteStatus: toggle,
        changeFilter,
        sites,
        filters,
      }}>
      {children}
    </DataMessageContext.Provider>
  )
}

export default DataMessageContextProvider
