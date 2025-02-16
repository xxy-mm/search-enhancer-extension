import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAppConfig } from '@/store/appConfig.slice'
import { queryMessage } from '@/models/base'
import { useMessage } from '@/hooks/useMessage'
import { useInit } from '@/hooks/useInit'
import SiteBox from '@/components/SiteBox'
import IconInput from '@/components/IconInput/IconInput'
import { Dropdown } from '@/components'

import addIcon from './plus.circle.svg'
import css from './App.module.css'

const App = () => {
  const searchConfig = useSelector(selectAppConfig)
  const { addSite, removeSite } = useMessage()

  const createSite = (domain: string) => {
    addSite({
      domain: domain.toLowerCase(),
      isActive: false,
    })
  }

  useInit()

  return (
    <div className={css.container}>
      <h1 className={css.title}>Search Enhancer</h1>

      <div className={css.siteList}>
        {searchConfig?.filters.map((filter) => (
          <Dropdown
            key={filter.name}
            filter={filter}
            onSelect={() => {}}
            disabled
          />
        ))}
        {searchConfig?.sites.map((site) => (
          <SiteBox
            key={site.domain}
            site={site}
            onRemove={removeSite}
            disabled
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
