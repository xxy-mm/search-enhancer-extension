import type { ISite } from '@/models/base'
import clsx from 'clsx'

export interface SiteItemProps {
  site: ISite
  toggleSite: (site: ISite) => void
}

export function SiteItem({ site, toggleSite }: SiteItemProps) {
  const classes = clsx({
    'xxy-btn-primary': site.isActive,
    'xxy-btn-blocked': !site.isActive,
  })

  return (
    <button
      type='button'
      className={`xxy-btn shadow-none xxy-btn-xs ${classes} font-normal`}
      key={site.domain}
      onClick={() => toggleSite(site)}
    >
      {site.domain}
    </button>
  )
}
