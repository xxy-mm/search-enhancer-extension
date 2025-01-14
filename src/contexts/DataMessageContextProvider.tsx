import { createContext } from 'react'
import * as React from 'react'

import { useMessage } from './useMessage'
import { IDataContext } from './DataContext.interface'

export const DataMessageContext = createContext<IDataContext>(
  {} as IDataContext
)

const DataMessageContextProvider = ({ children }: React.PropsWithChildren) => {
  const { add, remove, toggle, sites } = useMessage()

  return (
    <DataMessageContext.Provider
      value={{
        addSite: add,
        removeSite: remove,
        toggleSiteStatus: toggle,
        sites,
      }}>
      {children}
    </DataMessageContext.Provider>
  )
}

export default DataMessageContextProvider
