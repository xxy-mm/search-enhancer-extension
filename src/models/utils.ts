import { FILETYPE_FILTER_OPTIONS, type ISearchConfig } from './base'

const fileTypeRegexp = /filetype:([\S]+)/gi
const includedSiteRegexp = /\bsite:([\S]+)/gi

export const getComputedItems = (value: string, config: ISearchConfig) => {
  const { filters, sites } = config
  const result: ISearchConfig = { filters: [], sites: [] }
  const activeDomains: string[] = computeActiveSites(value)
  const activeFileType: string = computeFileType(value)
  const fileFilter = filters.find((filter) => filter.name === 'filetype')
  if (fileFilter && activeFileType !== 'all') {
    fileFilter.value = activeFileType
    result.filters.push(fileFilter)
  }
  sites.forEach((site) => {
    if (activeDomains.find((domain) => domain === site.domain)) {
      site.isActive = true
      result.sites.push(site)
    }
  })
  return result
}
export function makeCopy(config: ISearchConfig): ISearchConfig {
  return {
    filters: config.filters.map((f) => ({ ...f, value: 'all' })),
    sites: config.sites.map((f) => ({ ...f, isActive: false })),
  }
}
// compute active domain by the string provided
// all domains are returned, no matter it is included in config or not
export function computeActiveSites(value: string) {
  const included = value.matchAll(includedSiteRegexp) || []
  const result: string[] = []
  for (const match of included) {
    const domain = match[1]
    result.push(domain)
  }
  return result
}

// compute active file types by the string provided
// the file type are restricted to the values of file type options
// unknown file types are omitted
export function computeFileType(value: string) {
  const fileTypes = value.matchAll(fileTypeRegexp) || []
  const computedFileTypes: string[] = []
  for (const match of fileTypes) {
    const fileType = match[1]
    computedFileTypes.push(fileType)
  }

  let typeMatched: string | undefined
  for (let index = 0; index < FILETYPE_FILTER_OPTIONS.length; index++) {
    const option = FILETYPE_FILTER_OPTIONS[index]
    if (option.value.includes(',')) {
      if (
        option.value
          .split(',')
          .every((subType) => computedFileTypes.includes(subType))
      ) {
        typeMatched = option.value
        break
      }
    } else {
      if (computedFileTypes.includes(option.value)) {
        typeMatched = option.value
        break
      }
    }
  }
  if (!typeMatched) {
    typeMatched = 'all'
  }

  return typeMatched
}
