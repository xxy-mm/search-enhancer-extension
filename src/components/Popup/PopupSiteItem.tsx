import type { ISite } from '@/models/base'
import trashIcon from '@/assets/images/trash.svg'
type PopupSiteItemProps = {
  site: ISite
  removeSite: (site: ISite) => void
}
export const PopupSiteItem = ({ site, removeSite }: PopupSiteItemProps) => {
  return (
    <div
      className='xxy-indicator group'
      key={site.domain}
    >
      <span
        className='xxy-indicator-item xxy-badge xxy-badge-error p-0.5 w-5 h-5 rounded-full cursor-pointer hidden group-hover:block right-1 top-1'
        onClick={() => removeSite(site)}
      >
        <img
          src={trashIcon}
          className='w-4 h-4'
        />
      </span>
      <button className='xxy-btn xxy-btn-sm xxy-btn-block shadow-none cursor-move'>
        {site.domain}
      </button>
    </div>
  )
}
