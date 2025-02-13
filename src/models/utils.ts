import {
  FILETYPE_FILTER_OPTIONS,
  FILTER_OPTION_DEFAULT,
  type ISearchConfig,
  type ISessionSearchConfig,
} from './base'

const fileTypeRegexp = /filetype:([\S]+)/gi
const includedSiteRegexp = /\bsite:([\S]+)/gi

// FEAT: If we can store the result as a string, and compute it back to session search config in component
// the performance can be improved.
export const getComputedItems = (value: string, config: ISearchConfig) => {
  const { filters, sites } = config
  const result: ISessionSearchConfig = { filters: [], sites: [] }
  const activeDomains: string[] = computeActiveSites(value)
  const activeFileType: string = computeFileType(value)
  const fileFilter = filters.find((filter) => filter.name === 'filetype')
  if (fileFilter && activeFileType !== FILTER_OPTION_DEFAULT) {
    result.filters.push({ name: fileFilter.name, value: activeFileType })
  }
  sites.forEach((site) => {
    if (activeDomains.find((domain) => domain === site.domain)) {
      result.sites.push({ domain: site.domain })
    } else {
      // FEAT: add new site to search config and make it active
      // need discussion: how to prevent user from accidentally adding new site?
    }
  })
  return result
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
    typeMatched = FILTER_OPTION_DEFAULT
  }

  return typeMatched
}
