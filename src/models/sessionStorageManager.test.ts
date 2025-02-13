/**
 * @jest-environment jsdom
 */
import { SessionStorageManager } from './sessionStorageManager'
import { FILTER_OPTION_DEFAULT, type ISessionSearchConfig } from './base'

describe(SessionStorageManager.name, () => {
  const manager = new SessionStorageManager()
  const defaultConfig: ISessionSearchConfig = { filters: [], sites: [] }
  const mockConfig: ISessionSearchConfig = {
    filters: [{ name: 'filetype', value: 'pdf' }],
    sites: [{ domain: 'abc.com' }],
  }
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('returns empty config by default', () => {
    const result = manager.getSearchConfig()
    expect(result).toEqual(defaultConfig)
  })

  it('returns the correct config', () => {
    manager.setSearchConfig(mockConfig)
    const result = manager.getSearchConfig()
    expect(result).toEqual(mockConfig)
  })

  it('reset the config', () => {
    manager.setSearchConfig(mockConfig)
    manager.reset()
    const result = manager.getSearchConfig()
    expect(result).toEqual(defaultConfig)
  })
  it('update the filter', () => {
    manager.setSearchConfig(mockConfig)
    const newValue = 'rtf'
    manager.updateFilter({ name: 'filetype', value: newValue })
    const result = manager.getSearchConfig()
    expect(result.filters[0].value).toBe(newValue)
  })
  it('removes the filter', () => {
    manager.setSearchConfig(mockConfig)
    const newValue = FILTER_OPTION_DEFAULT
    manager.updateFilter({ name: 'filetype', value: newValue })
    const result = manager.getSearchConfig()
    expect(result.filters.length).toBe(0)
  })
  it('update the site', () => {
    manager.setSearchConfig(mockConfig)
    const newSite = { domain: 'new-site.com', isActive: true }
    manager.updateSite(newSite)
    const config = manager.getSearchConfig()
    expect(config.sites.length).toBe(2)
    expect(config.sites).toContainEqual({ domain: 'new-site.com' })
  })
  it('removes the site', () => {
    manager.setSearchConfig(mockConfig)
    const newSite = { domain: 'abc.com', isActive: false }
    manager.updateSite(newSite)
    const config = manager.getSearchConfig()
    expect(config.sites.length).toBe(0)
  })
})
