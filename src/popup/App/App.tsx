import { useSelector } from 'react-redux'
import { selectAppConfig } from '@/store/appConfig.slice'
import { useMessage } from '@/hooks/useMessage'
import { useInit } from '@/hooks/useInit'
import { useDetectTheme } from '@/hooks/useDetectTheme'
import SiteBox from '@/components/SiteBox'
import IconInput from '@/components/IconInput/IconInput'
import addIcon from '@/assets/images/plus.circle.svg'
import addIconDark from '@/assets/images/plus.circle-dark.svg'

import css from './App.module.css'

const App = () => {
  const { isDark } = useDetectTheme()
  const searchConfig = useSelector(selectAppConfig)
  const { addSite, removeSite } = useMessage()

  const createSite = (domain: string) => {
    addSite({
      domain: domain.replace(/\s+/g, '').toLocaleLowerCase(),
      isActive: false,
    })
  }

  useInit()

  return (
    <div className={css.container}>
      <h1 className={css.title}>Search Enhancer</h1>

      <div className={css.siteList}>
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
          icon={isDark ? addIcon : addIconDark}
          onEnter={createSite}
        />
      </div>
    </div>
  )
}

export default App
