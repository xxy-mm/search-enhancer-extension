import {
  type ISessionSearchConfig,
  emptySearchConfig,
  FILTER_OPTION_DEFAULT,
  type ISite,
  type ISessionFilter,
} from './base'

export class SessionStorageManager {
  private storageKey = 'searchEnhancer'

  setSearchConfig = (config: ISessionSearchConfig) => {
    sessionStorage.setItem(this.storageKey, JSON.stringify(config))
  }

  getSearchConfig = (): ISessionSearchConfig => {
    const config = sessionStorage.getItem(this.storageKey)
    return config ? JSON.parse(config) : emptySearchConfig
  }

  // update site config in session storage
  // if the site is active, then add it to session storage
  // else remove the site from session storage
  // only active sites are stored in session storage
  updateSite = (site: ISite) => {
    const { filters, sites } = this.getSearchConfig()
    const found = sites.find((item) => item.domain === site.domain)
    if (site.isActive) {
      if (!found) sites.push({ domain: site.domain })
    } else {
      if (found) sites.splice(sites.indexOf(found), 1)
    }
    this.setSearchConfig({ filters, sites })
  }

  // the difference from sites is all updated filters are stored in session storage
  // since they always have a value
  updateFilter = (filter: ISessionFilter) => {
    const { filters, sites } = this.getSearchConfig()
    const found = filters.find((f) => f.name === filter.name)

    if (filter.value === FILTER_OPTION_DEFAULT) {
      if (found) {
        filters.splice(filters.indexOf(found), 1)
      }
    } else {
      if (found) {
        found.value = filter.value
      } else {
        filters.push({ name: filter.name, value: filter.value })
      }
    }
    this.setSearchConfig({
      filters,
      sites,
    })
  }

  // reset all filter and sites to inactive state
  reset = () => {
    this.setSearchConfig(emptySearchConfig)
  }
}
