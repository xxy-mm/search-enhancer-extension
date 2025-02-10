import {
  type ISite,
  type IFilter,
  type ISearchConfig,
  emptySearchConfig,
} from './base'

export class SessionStorageManager {
  private storageKey = 'searchEnhancer'

  setSearchConfig = (config: ISearchConfig) => {
    sessionStorage.setItem(this.storageKey, JSON.stringify(config))
  }

  getSearchConfig = (): ISearchConfig => {
    const config = sessionStorage.getItem(this.storageKey)
    return config ? JSON.parse(config) : emptySearchConfig
  }

  // update site config in session storage
  // if the site is active, then add it to session storage
  // else remove the site from session storage
  // only active sites are stored in session storage
  updateSite = (site: ISite) => {
    const config = this.getSearchConfig()
    const found = config.sites.find((item) => item.domain === site.domain)
    if (site.isActive) {
      if (!found) config.sites.push(site)
    } else {
      if (found) config.sites.splice(config.sites.indexOf(found), 1)
    }
    this.setSearchConfig(config)
  }

  // the difference from sites is all updated filters are stored in session storage
  // since they always have a value
  updateFilter = (filter: IFilter) => {
    const config = this.getSearchConfig()
    const found = config.filters.find((f) => f.name === filter.name)

    if (found) {
      found.value = filter.value
    } else {
      config.filters.push(filter)
    }
    this.setSearchConfig(config)
  }

  setConfig = (config: ISearchConfig) => {
    sessionStorage.setItem(this.storageKey, JSON.stringify(config))
  }

  // reset all filter and sites to inactive state
  reset = () => {
    this.setSearchConfig(emptySearchConfig)
  }
}
