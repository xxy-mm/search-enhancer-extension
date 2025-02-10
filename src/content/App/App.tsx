import { useSessionStorage } from '@/hooks/useSessionStorage'
import { useInputSync } from '@/hooks/useInputSync'
import SiteBox from '@/components/SiteBox'
import { Button, Dropdown } from '@/components'
import deleteIcon from '@/assets/images/delete.svg'

import css from './App.module.css'

const App = () => {
  const {
    updateFilter,
    updateSite,
    reset,
    searchConfig: { filters, sites },
  } = useSessionStorage()

  useInputSync()

  return (
    <div className={css.container}>
      {filters.map((filter) => (
        <Dropdown
          key={filter.name}
          filter={filter}
          size={'sm'}
          onSelect={updateFilter}
        />
      ))}
      {sites.map((site) => (
        <SiteBox
          key={site.domain}
          site={site}
          size={'sm'}
          onToggle={updateSite}
        />
      ))}
      <Button
        size='sm'
        type='warning'
        onClick={reset}
        rounded>
        <img src={browser.runtime.getURL(deleteIcon)} />
      </Button>
    </div>
  )
}

export default App
