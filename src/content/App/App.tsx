import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
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
import { selectComputedConfig, useAppDispatch } from '@/store/store'
import {
  resetSessionConfig,
  selectSessionConfig,
  updateSessionFilter,
  updateSessionSite,
} from '@/store/sessionConfig.slice'
import { setAppConfig } from '@/store/appConfig.slice'
import {
  IDataAction,
  queryMessage,
  type IFilter,
  type IMessage,
  type ISite,
} from '@/models/base'
import { useSearchInput } from '@/hooks/useSearchInput'
import { useMessage } from '@/hooks/useMessage'
import { useInputSync } from '@/hooks/useInputSync'
import SiteBox from '@/components/SiteBox'
import { Button, Dropdown } from '@/components'
import { SortableItem } from '@/components'
import deleteIcon from '@/assets/images/delete.svg'

import css from './App.module.css'

const App = () => {
  const dispatch = useAppDispatch()
  const { searchInput } = useSearchInput()
  useInputSync()
  const { sortSites } = useMessage()
  const { filters, sites } = useSelector(selectComputedConfig)
  const { filters: sessionFilters, sites: sessionSites } =
    useSelector(selectSessionConfig)
  const items = useMemo(
    () =>
      sites.map((site) => ({
        ...site,
        id: site.domain,
      })),
    [sites]
  )
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const showRemoveBtn = sessionFilters.length > 0 || sessionSites.length > 0

  const clear = () => {
    dispatch(resetSessionConfig())
    if (searchInput) searchInput.focus()
  }
  const onFilterChange = (filter: IFilter) => {
    dispatch(updateSessionFilter(filter))
  }

  const onSiteChange = (site: ISite) => {
    dispatch(updateSessionSite(site))
  }
  useEffect(() => {
    const listener = (message: IMessage) => {
      if (message.type === IDataAction.UPDATED) {
        dispatch(setAppConfig(message.data.searchConfig))
      }
    }
    browser.runtime.onMessage.addListener(listener)
    return () => browser.runtime.onMessage.removeListener(listener)
  }, [dispatch])

  useEffect(() => {
    browser.runtime.sendMessage(queryMessage())
  }, [])

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
              onSelect={onFilterChange}
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
                onToggle={onSiteChange}
              />
            </SortableItem>
          ))}

          {showRemoveBtn ? (
            <Button
              size='sm'
              type='warning'
              onClick={clear}
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
