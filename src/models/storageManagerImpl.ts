import { ISite, type IFilter, type ISearchConfig } from './base'

export class StorageManagerImpl {
  private sitesKey: keyof ISearchConfig = 'sites'
  private filtersKey: keyof ISearchConfig = 'filters'

  // get search config which containers both sites and filters
  getSearchConfig = async (): Promise<ISearchConfig> => {
    const data = (await browser.storage.local.get({
      [this.filtersKey]: [],
      [this.sitesKey]: [],
    })) as ISearchConfig
    return data
  }

  setSearchConfig = async (config: ISearchConfig) => {
    await browser.storage.local.set({
      [this.filtersKey]: config.filters,
      [this.sitesKey]: config.sites,
    })
  }

  // MARK: site CURD
  // add site to storage
  addSite = async (site: ISite) => {
    const sites = await this.getSites()
    const found = sites.find((item) => item.domain === site.domain)
    if (found) return
    sites.push(site)
    await this.setSites(sites)
  }
  // remove site from storage
  removeSite = async (site: ISite) => {
    const sites = await this.getSites()
    const index = sites.findIndex((item) => item.domain === site.domain)
    if (index === -1) return
    sites.splice(index, 1)
    await this.setSites(sites)
  }

  // get all sites from storage
  getSites = async (): Promise<ISite[]> => {
    const data = await browser.storage.local.get({ [this.sitesKey]: [] })
    return data[this.sitesKey]
  }

  // replace all sites in storage with new sites
  setSites = async (sites: ISite[]): Promise<void> => {
    await browser.storage.local.set({ [this.sitesKey]: sites })
  }

  // MARK: Filter CURD

  getFilters = async (): Promise<IFilter[]> => {
    const result = await browser.storage.local.get({ [this.filtersKey]: [] })
    return result[this.filtersKey]
  }

  // add a filter to storage
  addFilter = async (filter: IFilter) => {
    const filters = await this.getFilters()
    const found = filters.find((f) => f.name === filter.name)
    if (found) {
      filters.splice(filters.indexOf(found), 1, filter)
    } else {
      filters.push(filter)
    }
    await browser.storage.local.set({ [this.filtersKey]: filters })
  }

  // remove a filter from storage
  removeFilter = async (filter: IFilter) => {
    const filters = await this.getFilters()
    const found = filters.find((f) => f.name === filter.name)
    if (!found) return
    filters.splice(filters.indexOf(found), 1)
    await browser.storage.local.set({ [this.filtersKey]: filters })
  }

  // replace filters in storage with the provided filters
  setFilters = async (filters: IFilter[]) => {
    await browser.storage.local.set({ [this.filtersKey]: filters })
  }
}
