import {
  FILETYPE_FILTER_OPTIONS,
  IFilterName,
  SiteItemType,
  SiteStatus,
  type IFilter,
  type ISite,
  type ISiteItemList,
} from './base'

export function objectKeyMap(obj: ISiteItemList) {
  return obj.reduce((prev, current) => {
    if (current.type === SiteItemType.FILTER) {
      prev[current.name] = current.value
    } else if (current.type === SiteItemType.SITE) {
      prev[current.domain] = current.status
    }
    return prev
  }, {} as { [prop: string]: string })
}

export function hasChanged(source: ISiteItemList, obj: ISiteItemList) {
  const keyMap1 = objectKeyMap(source)
  const keyMap2 = objectKeyMap(obj)

  return !Object.keys(keyMap1).every((key) => keyMap1[key] === keyMap2[key])
}
const fileTypeRegexp = /filetype:([\S]+)/gi
const includedSiteRegexp = /\bsite:([\S]+)/gi

export const getComputedItems = (value: string, items: ISiteItemList) => {
  if (items.length < 1) return

  let copy = makeCopy(items)

  copy = computeActiveSites(value, copy)

  copy = computeFileType(value, copy)

  return copy
}
function makeCopy(items: ISiteItemList) {
  return [...items].map((item) => {
    if (item.type === SiteItemType.FILTER) {
      item.value = 'all'
    } else {
      item.status = SiteStatus.NONE
    }
    return item
  })
}
function computeActiveSites(value: string, copy: ISiteItemList) {
  const included = value.matchAll(includedSiteRegexp) || []
  for (const match of included) {
    const domain = match[1]
    const found = copy.find(
      (item) => item.type === SiteItemType.SITE && item.domain === domain
    ) as ISite
    if (!found) continue
    found.status = SiteStatus.INCLUDE
  }
  return copy
}

function computeFileType(value: string, copy: ISiteItemList) {
  const fileTypes = value.matchAll(fileTypeRegexp) || []
  const computedFileTypes: string[] = []
  for (const match of fileTypes) {
    const fileType = match[1]
    const found = copy.find(
      (item) =>
        item.type === SiteItemType.FILTER && item.name === IFilterName.FILE_TYPE
    ) as IFilter
    if (!found) continue
    computedFileTypes.push(fileType)

    let typeMatched: string | undefined
    for (let index = 0; index < FILETYPE_FILTER_OPTIONS.length; index++) {
      const type = FILETYPE_FILTER_OPTIONS[index]
      if (
        type.value
          .split(',')
          .every((subType) => computedFileTypes.includes(subType))
      ) {
        typeMatched = type.value
        break
      }
    }
    if (!typeMatched) {
      typeMatched = 'all'
    }
    found.value = typeMatched
  }
  return copy
}
