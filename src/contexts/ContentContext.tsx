import { createContext } from "react"
import { IDataContext } from "./DataContext"

export const ContentContext = createContext<IDataContext>({} as IDataContext)