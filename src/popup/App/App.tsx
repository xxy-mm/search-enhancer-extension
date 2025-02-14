import { useMessage } from '@/hooks/useMessage'
import SiteBox from '@/components/SiteBox'
import IconInput from '@/components/IconInput/IconInput'
import { Dropdown } from '@/components'

import addIcon from './plus.circle.svg'
import css from './App.module.css'

const App = () => {
  const { addSite, searchConfig, removeSite } = useMessage()

  const { sites, filters } = searchConfig

  const createSite = (domain: string) => {
    addSite({
      domain: domain.toLowerCase(),
      isActive: false,
    })
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Search Enhancer</h1>

      <div className={css.siteList}>
        {filters.map((filter) => (
          <Dropdown
            key={filter.name}
            filter={filter}
            onSelect={() => {}}
            disabled
          />
        ))}
        {sites.map((site) => (
          <SiteBox
            key={site.domain}
            site={site}
            onRemove={removeSite}
          />
        ))}
      </div>
      <div className={`${css.actionGroup} ${css.flexEnd}`}>
        <IconInput
          placeholder='Input a site then press enter'
          icon={addIcon}
          onEnter={createSite}
        />
      </div>
    </div>
  )
}

export default App
