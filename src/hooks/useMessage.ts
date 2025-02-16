import {
  addSiteMessage,
  removeSiteMessage,
  ISite,
  sortSitesMessage,
} from '@/models/base'

export function useMessage() {
  const addSite = (item: ISite) => {
    browser.runtime.sendMessage(addSiteMessage(item))
  }

  const removeSite = (item: ISite) => {
    browser.runtime.sendMessage(removeSiteMessage(item))
  }

  const sortSites = (sites: ISite[]) => {
    browser.runtime.sendMessage(sortSitesMessage(sites))
  }

  return {
    addSite,
    removeSite,
    sortSites,
  }
}
