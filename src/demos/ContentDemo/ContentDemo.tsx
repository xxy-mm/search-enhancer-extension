import { Select } from '@/components/Select'
import { SiteItem } from '@/components/SiteItem'
import { FILETYPE_FILTER_OPTIONS } from '@/filters/filetype'
import { type ISite } from '@/models/base'
import { useState } from 'react'
import deleteIcon from '@/assets/images/delete.svg'
const mockSites: ISite[] = Array(20)
  .fill(0)
  .map((_, dix) => ({
    domain: `site${dix}.com`,
    isActive: Math.random() > 0.5,
  }))
export const ContentDemo = () => {
  const [sites, setSites] = useState<ISite[]>(mockSites)
  const [filetype, setFiletype] = useState<string>('all')
  const toggle = (site: ISite) => {
    const found = sites.find((s) => s.domain === site.domain)
    if (!found) return
    found.isActive = !found.isActive
    setSites([...sites])
  }
  const onFiletypeChange = (filetype: string) => {
    console.log(filetype)
    setFiletype(filetype)
  }
  const removeAll = () => {
    setFiletype('all')
    sites.forEach((site) => (site.isActive = false))
    setSites([...sites])
  }
  return (
    <div className='flex flex-col w-2xl'>
      <input
        type='text'
        className='xxy-input xxy-input-lg w-[100%]'
      />
      <div className='rounded overflow-hidden flex flex-wrap gap-1 pt-1 max-h-6 hover:max-h-max'>
        <button
          className='xxy-btn xxy-btn-xs bg-error xxy-text-primary-content p-1'
          onClick={removeAll}
        >
          <img
            src={deleteIcon}
            className='w-3'
          />
        </button>
        <Select
          options={FILETYPE_FILTER_OPTIONS}
          onChange={onFiletypeChange}
          value={filetype}
        />

        {sites.map((site) => (
          <SiteItem
            key={site.domain}
            site={site}
            toggleSite={toggle}
          />
        ))}
      </div>
    </div>
  )
}
