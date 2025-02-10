import { ISite } from './base'

// todo: people might want to see the active sites at the leading place.
// but not sure. A better solution is to add the functionality allowing users
// to sort the site manually.

export function siteSorter(a: ISite, b: ISite) {
  const aIndex = a.isActive ? 0 : 1
  const bIndex = b.isActive ? 0 : 1
  return aIndex - bIndex
}
