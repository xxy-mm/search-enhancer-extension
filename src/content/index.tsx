import { PersistGate } from 'redux-persist/integration/react'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { persistor, store } from '@/store/store'

import App from './App'

function injectCustomElement() {
  // Find the search dialog container
  const customElement = document.createElement('div')
  customElement.id = 'search-enhancer-root'

  const form = document.querySelector(`form[action="/search"]`)
  const textarea = form?.querySelector('textarea')
  const textareaContainer =
    textarea?.parentElement?.parentElement?.parentElement

  if (!textareaContainer) return

  textareaContainer.parentElement?.insertBefore(
    customElement,
    textareaContainer.nextElementSibling
  )
  createRoot(customElement).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectCustomElement)
} else {
  injectCustomElement()
}
