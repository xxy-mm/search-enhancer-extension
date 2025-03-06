import { useSelector } from 'react-redux'
import { selectAppConfig } from '@/store/appConfig.slice'
import { useMessage } from '@/hooks/useMessage'
import { useInit } from '@/hooks/useInit'
import { Popup } from '@/components/Popup'

const App = () => {
  useInit()
  const { sites } = useSelector(selectAppConfig)
  const { addSite, removeSite, sortSites } = useMessage()

  return (
    <div className='p-4 bg-base-100 w-96'>
      <Popup
        sortSites={sortSites}
        addSite={addSite}
        removeSite={removeSite}
        sites={sites}
      />
    </div>
  )
}

export default App
