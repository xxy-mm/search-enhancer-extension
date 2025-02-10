import {
  FILETYPE_FILTER_OPTIONS,
  SiteItemType,
  type ISiteItemList,
} from './base'

export function objectKeyMap(obj: ISiteItemList) {
  return obj.reduce((prev, current) => {
    if (current.type === SiteItemType.FILTER) {
      prev[current.name] = current.value
    } else if (current.type === SiteItemType.SITE) {
      prev[current.domain] = current.isActive
    }
    return prev
  }, {} as { [prop: string]: string | boolean })
}

export function hasChanged(source: ISiteItemList, obj: ISiteItemList) {
  const keyMap1 = objectKeyMap(source)
  const keyMap2 = objectKeyMap(obj)

  return !Object.keys(keyMap1).every((key) => keyMap1[key] === keyMap2[key])
}
const fileTypeRegexp = /filetype:([\S]+)/gi
const includedSiteRegexp = /\bsite:([\S]+)/gi

export const getComputedItems = (value: string, items: ISiteItemList) => {
  if (items.length === 0) return

  const copy = makeCopy(items)

  const activeDomains: string[] = computeActiveSites(value)

  const activeFileType: string = computeFileType(value)

  copy.forEach((c) => {
    if (c.type === SiteItemType.FILTER) {
      c.value = activeFileType
    } else {
      if (activeDomains.find((domain) => domain === c.domain)) {
        c.isActive = true
      }
    }
  })
  return copy
}
export function makeCopy(items: ISiteItemList) {
  return [...items].map((item) => {
    if (item.type === SiteItemType.FILTER) {
      item.value = 'all'
    } else {
      item.isActive = false
    }
    return item
  })
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
// todo: should support multi filetypes filter
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
