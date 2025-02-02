import { SiteItemType, type ISiteItem, type ISiteItemList } from './base'

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

  return Object.keys(keyMap1).every((key) => keyMap1[key] === keyMap2[key])
}
