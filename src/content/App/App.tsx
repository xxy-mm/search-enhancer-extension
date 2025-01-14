import React from 'react'
import { useEffect, useState } from 'react'
import { readMessage, type ISiteItem } from '@/models/base'
import SiteItem from '@/components/SiteItem/SiteItem'

import css from './App.module.css'

interface IApp {}

const App = ({}: IApp) => {
  const [siteItems, setSiteItems] = useState<ISiteItem[]>([])

  useEffect(() => {
    browser.runtime
      .sendMessage(readMessage())
      .then((list) => setSiteItems(list))
  }, [])

  return (
    <div className={css.container}>
      {siteItems.map((siteItem) => (
        <SiteItem
          item={siteItem}
          key={siteItem.domain}
          onRemove={() => {}}
          onToggle={() => {}}
        />
      ))}
    </div>
  )
}

export default App
