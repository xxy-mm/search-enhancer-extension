import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DataMessageContextProvider from '@/contexts/DataMessageContextProvider'

import App from './App/App'

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)

createRoot(rootElement).render(
  <StrictMode>
    <DataMessageContextProvider>
      <App />
    </DataMessageContextProvider>
  </StrictMode>
)
