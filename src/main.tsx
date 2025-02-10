import '@/assets/styles/common.css'

import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import SiteBox from './components/SiteBox'

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)

createRoot(rootElement).render(
  <StrictMode>
    <SiteBox
      site={{
        domain: 'abc.com',
        isActive: false,
      }}
    />
  </StrictMode>
)
