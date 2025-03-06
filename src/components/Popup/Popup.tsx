import type { ISite } from '@/models/base'
import { SiteInput } from '../SiteInput'
import { useMemo, type PropsWithChildren } from 'react'
import { PopupSiteItem } from './PopupSiteItem'
import { SortableItem } from '@/components'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'

type PopupProps = {
  sites: ISite[]
  addSite: (site: ISite) => void
  removeSite: (site: ISite) => void
  sortSites: (sites: ISite[]) => void
  showHeader?: boolean
}
export const Popup = ({
  sites,
  addSite,
  removeSite,
  sortSites,
  showHeader = true,
}: PopupProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )
  const add = (domain: string) => {
    addSite({ domain, isActive: false })
  }
  const items = useMemo(
    () =>
      sites.map((site) => ({
        ...site,
        id: site.domain,
      })),
    [sites]
  )

  return (
    <div className='flex flex-col gap-2'>
      {showHeader ? (
        <h1 className='text-center text-lg text-base-content'>
          Search Enhancer
        </h1>
      ) : null}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={rectSortingStrategy}
        >
          <PopupSiteItemList>
            {sites.map((site) => (
              <SortableItem
                id={site.domain}
                key={site.domain}
              >
                <PopupSiteItem
                  site={site}
                  removeSite={removeSite}
                />
              </SortableItem>
            ))}
          </PopupSiteItemList>
        </SortableContext>
      </DndContext>
      <div className='flex justify-end'>
        <SiteInput onEnter={add} />
      </div>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      const sorted = arrayMove(items, oldIndex, newIndex)
      sortSites(sorted)
    }
  }
}

const PopupSiteItemList = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-52 border rounded border-base-300 dark:border-accent-content p-1.5 flex gap-1 flex-wrap content-start'>
      {children}
    </div>
  )
}
