import '@/assets/styles/common.css'

import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WebStorageManagerImpl } from '@/models/webtorageManager'
import { ExtensionStorageManagerImpl } from '@/models/extensionStorageManagerImpl'
import { PopupContextProvider } from '@/contexts/PopupContextProvider'

import App from './App/App'

const rootElement = document.createElement('div')
rootElement.id = 'root'
document.body.appendChild(rootElement)

const storageManager = browser.storage
  ? new ExtensionStorageManagerImpl()
  : new WebStorageManagerImpl()

console.log('is extension: ', !!browser.storage)

createRoot(rootElement).render(
  <StrictMode>
    <PopupContextProvider storageManager={storageManager}>
      <App />
    </PopupContextProvider>
  </StrictMode>
)
