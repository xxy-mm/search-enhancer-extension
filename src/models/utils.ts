import type { ISessionConfig } from '@/store/sessionConfig.slice'
import type { IAppConfig } from '@/store/appConfig.slice'
import { languageFilter } from '@/filters/language'
import { FILETYPE_FILTER_OPTIONS, fileTypeFilter } from '@/filters/filetype'

import { FILTER_OPTION_DEFAULT } from './base'

const fileTypeRegexp = /filetype:([\S]+)/gi
const languageRegexp = /lr:([\S]+)/gi
const includedSiteRegexp = /\bsite:([\S]+)/gi

// FEAT: If we can store the result as a string, and compute it back to session search config in component
// the performance can be improved.
export const getComputedItems = (value: string, config: IAppConfig) => {
  const { sites, filters } = config
  const result: ISessionConfig = { filters: [], sites: [] }
  const activeDomains: string[] = computeActiveSites(value)
  const activeFileType: string = computeActiveFileType(value)
  // const activeLanguage: string = computeActiveLanguage(value)

  if (
    filters.find((filter) => filter.name === 'filetype') &&
    activeFileType !== FILTER_OPTION_DEFAULT
  ) {
    result.filters.push({ ...fileTypeFilter, value: activeFileType })
  }
  // if (activeLanguage != FILTER_OPTION_DEFAULT) {
  //   result.filters.push({ ...languageFilter, value: activeLanguage })
  // }
  sites.forEach((site) => {
    if (activeDomains.find((domain) => domain === site.domain)) {
      result.sites.push({ ...site, isActive: true })
    } else {
      // FEAT: add new site to search config and make it active
      // need discussion: how to prevent user from accidentally adding new site?
    }
  })
  return result
}

// compute active domain by the string provided
// all domains are returned, no matter it is included in config or not
export function computeActiveSites(value: string): string[] {
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
export function computeActiveFileType(value: string): string {
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

function computeActiveLanguage(value: string): string {
  const matched = value.matchAll(languageRegexp)

  for (const match of matched) {
    const code = match[1]
    if (code) return code
  }
  return FILTER_OPTION_DEFAULT
}

export function isEqual(source: IAppConfig, target: IAppConfig) {
  const { filters: sourceFilters, sites: sourceSites } = source
  const { filters: targetFilters, sites: targetSites } = target
  if (
    sourceFilters.length !== targetFilters.length ||
    sourceSites.length !== targetSites.length
  ) {
    return false
  }
  for (let index = 0; index < sourceFilters.length; index++) {
    const sf = sourceFilters[index]
    if (
      !targetFilters.some((tf) => tf.name === sf.name && tf.value === sf.value)
    ) {
      return false
    }
  }
  for (let index = 0; index < sourceSites.length; index++) {
    const ss = sourceSites[index]
    if (
      !targetSites.some(
        (ts) => ts.domain === ss.domain && ts.isActive === ss.isActive
      )
    ) {
      return false
    }
  }
  return true
}
const placeholder = '🔍'
const siteItemRegexp = /(-?site:\S+|filetype:\S+|lr:\S+)(\s+(OR)\s*)?/g
export function computeUserInput(value: string): {
  words: string
  match: string | null
} {
  const match = value.match(siteItemRegexp)
  let words = value.replace(siteItemRegexp, '').trimStart()
  if (words === '') {
    words = placeholder
  } else if (words.trim() !== placeholder && words.includes(placeholder)) {
    words = words.replace(placeholder, '')
  }
  let matchString: string | null = null
  if (match) {
    matchString = match.map((m) => m.trim()).join(' ')
  }
  return { words, match: matchString }
}

export function isIphone() {
  return navigator.userAgent.match(/IPhone/i)
}
