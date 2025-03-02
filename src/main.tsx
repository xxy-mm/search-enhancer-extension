import '@/assets/styles/common.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)

createRoot(rootElement).render(<StrictMode></StrictMode>)
