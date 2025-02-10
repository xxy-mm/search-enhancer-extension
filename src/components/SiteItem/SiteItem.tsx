import { SiteItemType, type ISiteItem } from '@/models/base'
import { useMessage } from '@/hooks/useMessage'

import SiteBox from '../SiteBox'
import FilterBox from '../FilterBox'
import { Dropdown } from '../Dropdown'

export type SiteItemProps = {
  siteItem: ISiteItem
  canRemoveSite?: boolean
  canToggleSite?: boolean
  size?: 'sm'
}

export function SiteItem({
  siteItem,
  canRemoveSite,
  canToggleSite,
  size,
}: SiteItemProps) {
  const { changeFilter, toggleSite, removeSite } = useMessage()

  const siteItemComponent = () => {
    switch (siteItem.type) {
      case SiteItemType.FILTER:
        return (
          <Dropdown
            size={size}
            filter={siteItem}
            onSelect={changeFilter}
            key={siteItem.name}
          />
        )
      case SiteItemType.SITE:
        return (
          <SiteBox
            site={siteItem}
            size={size}
            key={siteItem.domain}
            onToggle={canToggleSite ? toggleSite : undefined}
            onRemove={canRemoveSite ? removeSite : undefined}
          />
        )
    }
  }

  return siteItemComponent()
}
