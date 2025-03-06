import { PersistGate } from 'redux-persist/integration/react'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { persistor, store } from '@/store/store'
import '@/assets/styles/common.css'
import App from './App'
import { IPhoneProvider } from '@/hooks/IPhoneProvider'

function injectCustomElement() {
  // Find the search dialog container
  const container = document.createElement('div')
  const shadowRoot = container.attachShadow({ mode: 'open' })

  const customElement = document.createElement('div')
  customElement.id = 'search-enhancer-root'
  // create a style tag and copy css content into it
  // MARK: browser incompatible
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = browser.runtime.getURL('dist/content.css')
  shadowRoot.appendChild(link)
  shadowRoot.appendChild(customElement)

  const form = document.querySelector(`form[action="/search"]`)
  const textarea = form?.querySelector('textarea')
  const textareaContainer =
    textarea?.parentElement?.parentElement?.parentElement

  if (!textareaContainer) return

  textareaContainer.parentElement?.insertBefore(
    container,
    textareaContainer.nextElementSibling
  )
  createRoot(customElement).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <IPhoneProvider rootElement={customElement}>
            <App />
          </IPhoneProvider>
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
