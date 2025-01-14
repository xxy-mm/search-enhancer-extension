import { createContext } from "react"
import { ISiteItem } from "../models/base"



export interface IDataContext {
    addSite: (domain: string) => void
    removeSite: (domain: string) => void
    toggleSiteStatus: (domain: string) => void
    siteItems: ISiteItem[]
}

