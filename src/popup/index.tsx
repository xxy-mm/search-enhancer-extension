import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { store } from '@/store/store'
import '@/assets/styles/common.css'
import App from './App/App'

const rootElement = document.createElement('div')
rootElement.id = 'search-enhancer-root'
document.body.appendChild(rootElement)

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
