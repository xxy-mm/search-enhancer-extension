import { useContext, useState } from 'react'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useInputSync } from '@/hooks/useInputSync'
import { ContentContext } from '@/contexts/ContentContext'
import SiteBox from '@/components/SiteBox'
import { Button, Dropdown } from '@/components'
import { SortableItem } from '@/components'
import deleteIcon from '@/assets/images/delete.svg'

import css from './App.module.css'

const App = () => {
  const {
    updateFilter,
    updateSite,
    reset,
    sortSites,
    computedConfig: { filters, sites },
    sessionConfig,
  } = useContext(ContentContext)
  useInputSync()
  const items = sites.map((site) => ({ ...site, id: site.domain }))
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const showRemoveBtn =
    sessionConfig.filters.length > 0 || sessionConfig.sites.length > 0

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}>
      <SortableContext
        items={items}
        strategy={rectSortingStrategy}>
        <div className={css.container}>
          {filters.map((filter) => (
            <Dropdown
              key={filter.name}
              filter={filter}
              size={'sm'}
              onSelect={updateFilter}
            />
          ))}

          {items.map((site) => (
            <SortableItem
              id={site.id}
              key={site.id}>
              <SiteBox
                key={site.domain}
                site={site}
                size={'sm'}
                onToggle={updateSite}
              />
            </SortableItem>
          ))}

          {showRemoveBtn ? (
            <Button
              size='sm'
              type='warning'
              onClick={reset}
              rounded>
              <img src={browser.runtime.getURL(deleteIcon)} />
            </Button>
          ) : null}
        </div>
      </SortableContext>
    </DndContext>
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

export default App
