import {
  addSiteMessage,
  removeSiteMessage,
  ISite,
  sortSitesMessage,
} from '@/models/base'

export function useMessage() {
  const addSite = (item: ISite) => {
    chrome.runtime.sendMessage(addSiteMessage(item)).then(
      (res) => {
        console.log(res)
      },
      (reason) => {
        console.error(reason)
      }
    )
  }

  const removeSite = (item: ISite) => {
    chrome.runtime.sendMessage(removeSiteMessage(item)).then(
      (res) => {
        console.log(res)
      },
      (reason) => {
        console.error(reason)
      }
    )
  }

  const sortSites = (sites: ISite[]) => {
    chrome.runtime.sendMessage(sortSitesMessage(sites)).then(
      (res) => {
        console.log(res)
      },
      (reason) => {
        console.error(reason)
      }
    )
  }

  return {
    addSite,
    removeSite,
    sortSites,
  }
}
