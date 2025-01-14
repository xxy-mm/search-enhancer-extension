import { createContext } from "react"
import { IDataContext } from "./DataContext"



export const PopupContext = createContext<IDataContext>({} as IDataContext)

