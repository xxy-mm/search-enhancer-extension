import { ISite, SiteStatus } from './base'

// todo: people might want to see the active sites at the leading place.
// but not sure. A better solution is to add the functionality allowing users
// to sort the site manually.
const sortSequence: SiteStatus[] = [
  SiteStatus.INCLUDE,
  // SiteStatus.EXCLUDE,
  SiteStatus.NONE,
]
export function siteSorter(a: ISite, b: ISite) {
  const aIndex = sortSequence.indexOf(a.status)
  const bIndex = sortSequence.indexOf(b.status)
  return aIndex - bIndex
}
