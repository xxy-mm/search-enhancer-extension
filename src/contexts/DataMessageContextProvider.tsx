import { createContext } from 'react'
import * as React from 'react'

import { IDataContext } from './DataContext.interface'
import { useMessage } from '../hooks/useMessage'

export const DataMessageContext = createContext<IDataContext>(
  {} as IDataContext
)

const DataMessageContextProvider = ({ children }: React.PropsWithChildren) => {
  const { addSite, removeSite, toggleSite, siteItems, changeFilter, sort } =
    useMessage()

  return (
    <DataMessageContext.Provider
      value={{
        addSite,
        removeSite,
        toggleSite,
        changeFilter,
        sort,
        siteItems,
      }}>
      {children}
    </DataMessageContext.Provider>
  )
}

export default DataMessageContextProvider
