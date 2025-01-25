import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App/App'

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
