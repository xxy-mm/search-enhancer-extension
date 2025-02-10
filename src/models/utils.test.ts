import {
  computeActiveSites,
  computeFileType,
  getComputedItems,
  makeCopy,
} from './utils'
import {
  FILETYPE_FILTER_OPTIONS,
  FilterNames,
  SiteItemType,
  SiteStatus,
  type ISiteItemList,
} from './base'

describe('compute filters from string', () => {
  const singleFilterString = 'filetype:pdf site:reddit.com some words'
  const multiFiltersString =
    'filetype:doc OR filetype:docx site:reddit.com OR site:abc.com some words'
  const threeFiltersString =
    'filetype:pdf OR filetype:doc OR filetype:docx site:reddit.com OR site:abc.com OR site:x.com some words'
  const siteItems: ISiteItemList = [
    {
      name: FilterNames.FILE_TYPE,
      options: FILETYPE_FILTER_OPTIONS,
      type: SiteItemType.FILTER,
      value: 'doc,docx',
    },
    {
      status: SiteStatus.INCLUDE,
      type: SiteItemType.SITE,
      domain: 'reddit.com',
    },
    {
      status: SiteStatus.INCLUDE,
      type: SiteItemType.SITE,
      domain: 'x.com',
    },
    { status: SiteStatus.INCLUDE, type: SiteItemType.SITE, domain: 'abc.com' },
  ]

  describe('makeCopy', () => {
    it('reset all site item status', () => {
      const copy = makeCopy(siteItems)
      copy.forEach((c) => {
        if (c.type === SiteItemType.FILTER) {
          expect(c.value === 'all')
        } else {
          expect(c.status === SiteStatus.NONE)
        }
      })
    })
  })

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
    it('returns undefined if site item list is empty', () => {
      const result = getComputedItems(singleFilterString, [])
      expect(result).toBe(undefined)
    })
    it('returns the computed site item list(single)', () => {
      const result = getComputedItems(singleFilterString, siteItems)
      expect(result).toHaveLength(siteItems.length)
      expect(result).toContainEqual({
        name: FilterNames.FILE_TYPE,
        options: FILETYPE_FILTER_OPTIONS,
        type: SiteItemType.FILTER,
        value: 'pdf',
      })
      expect(result).toContainEqual({
        domain: 'reddit.com',
        status: SiteStatus.INCLUDE,
        type: SiteItemType.SITE,
      })
    })

    it('returns the computed site item list(multiple)', () => {
      const result = getComputedItems(multiFiltersString, siteItems)
      expect(result).toHaveLength(siteItems.length)
      expect(result).toContainEqual({
        name: FilterNames.FILE_TYPE,
        options: FILETYPE_FILTER_OPTIONS,
        type: SiteItemType.FILTER,
        value: 'doc,docx',
      })
      expect(result).toContainEqual({
        domain: 'reddit.com',
        status: SiteStatus.INCLUDE,
        type: SiteItemType.SITE,
      })
      expect(result).toContainEqual({
        domain: 'abc.com',
        status: SiteStatus.INCLUDE,
        type: SiteItemType.SITE,
      })
    })
    it('returns the computed site item list(treble)', () => {
      const result = getComputedItems(threeFiltersString, siteItems)
      expect(result).toHaveLength(siteItems.length)
      expect(result).toContainEqual({
        name: FilterNames.FILE_TYPE,
        options: FILETYPE_FILTER_OPTIONS,
        type: SiteItemType.FILTER,
        value: 'pdf',
      })
      expect(result).toContainEqual({
        domain: 'reddit.com',
        status: SiteStatus.INCLUDE,
        type: SiteItemType.SITE,
      })
      expect(result).toContainEqual({
        domain: 'abc.com',
        status: SiteStatus.INCLUDE,
        type: SiteItemType.SITE,
      })
      expect(result).toContainEqual({
        domain: 'x.com',
        status: SiteStatus.INCLUDE,
        type: SiteItemType.SITE,
      })
    })
  })
})
