import { computeActiveSites, computeFileType, getComputedItems } from './utils'
import {
  FILETYPE_FILTER_OPTIONS,
  type IFilter,
  type ISearchConfig,
  type ISite,
} from './base'

describe('compute filters from string', () => {
  const singleFilterString = 'filetype:pdf site:reddit.com some words'
  const multiFiltersString =
    'filetype:doc OR filetype:docx site:reddit.com OR site:abc.com some words'
  const threeFiltersString =
    'filetype:pdf OR filetype:doc OR filetype:docx site:reddit.com OR site:abc.com OR site:x.com some words'
  const emptyConfig: ISearchConfig = { filters: [], sites: [] }
  const sites: ISite[] = [
    {
      isActive: true,
      domain: 'reddit.com',
    },
    {
      isActive: true,
      domain: 'x.com',
    },
    {
      isActive: true,
      domain: 'abc.com',
    },
  ]
  const filters: IFilter[] = [
    {
      name: 'filetype',
      options: FILETYPE_FILTER_OPTIONS,
      value: 'doc,docx',
    },
  ]
  const searchConfig: ISearchConfig = { sites, filters }

  describe('computeActiveSites', () => {
    it('returns the only site matched in string', () => {
      const domains = computeActiveSites(singleFilterString)
      expect(domains.length).toEqual(1)
      expect(domains[0]).toEqual('reddit.com')
    })
    it('returns 2 matched sites in string', () => {
      const domains = computeActiveSites(multiFiltersString)
      expect(domains.length).toEqual(2)
      expect(domains).toEqual(['reddit.com', 'abc.com'])
    })
    it('returns 3 matched sites in string', () => {
      const domains = computeActiveSites(threeFiltersString)
      expect(domains.length).toEqual(3)
      expect(domains).toEqual(['reddit.com', 'abc.com', 'x.com'])
    })
  })

  describe('computeFileType', () => {
    it('returns the only matched filetype', () => {
      const filetype = computeFileType(singleFilterString)
      expect(filetype).toBe('pdf')
    })

    it('returns combined filetype in string', () => {
      const filetype = computeFileType(multiFiltersString)

      expect(filetype).toBe('doc,docx')
    })
    it('returns first matched filetype in string', () => {
      const filetype = computeFileType(threeFiltersString)
      expect(filetype).toBe('pdf')
    })
  })

  describe(getComputedItems.name, () => {
    it('returns empty config if site item list is empty', () => {
      const result = getComputedItems(singleFilterString, emptyConfig)
      expect(result).toEqual(emptyConfig)
    })
    it('returns the computed site item list(single)', () => {
      const { filters, sites } = getComputedItems(
        singleFilterString,
        searchConfig
      )
      expect(filters).toContainEqual({
        name: 'filetype',
        value: 'pdf',
      })
      expect(sites).toContainEqual({
        domain: 'reddit.com',
      })
    })

    it('returns the computed site item list(multiple)', () => {
      const { filters, sites } = getComputedItems(
        multiFiltersString,
        searchConfig
      )
      expect(filters).toContainEqual({
        name: 'filetype',
        value: 'doc,docx',
      })
      expect(sites).toContainEqual({
        domain: 'reddit.com',
      })
      expect(sites).toContainEqual({
        domain: 'abc.com',
      })
    })
    it('returns the computed site item list(treble)', () => {
      const { filters, sites } = getComputedItems(
        threeFiltersString,
        searchConfig
      )
      expect(filters).toContainEqual({
        name: 'filetype',
        value: 'pdf',
      })
      expect(sites).toContainEqual({
        domain: 'reddit.com',
      })
      expect(sites).toContainEqual({
        domain: 'abc.com',
      })
      expect(sites).toContainEqual({
        domain: 'x.com',
      })
    })
  })
})
