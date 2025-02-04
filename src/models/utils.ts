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
  console.log('effect run: getComputedItems')
  if (items.length < 1) return

  const copy = [...items].map((item) => {
    if (item.type === SiteItemType.FILTER) {
      item.value = 'all'
    } else {
      item.status = SiteStatus.NONE
    }
    return item
  })
  const included = value.matchAll(includedSiteRegexp) || []

  const fileTypes = value.matchAll(fileTypeRegexp) || []

  for (const match of included) {
    const domain = match[1]
    const found = copy.find(
      (item) => item.type === SiteItemType.SITE && item.domain === domain
    ) as ISite
    if (!found) continue
    found.status = SiteStatus.INCLUDE
  }
  for (const match of fileTypes) {
    const fileType = match[1]
    const found = copy.find(
      (item) =>
        item.type === SiteItemType.FILTER && item.name === IFilterName.FILE_TYPE
    ) as IFilter
    if (!found) continue
    found.value = FILETYPE_FILTER_OPTIONS.some((opt) => opt.value === fileType)
      ? fileType
      : 'all'
  }

  if (hasChanged(items, copy)) {
    return copy
  }
}
