import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App/App'

function injectCustomElement() {
  // Find the search dialog container
  const searchContainer = document.querySelector('.RNNXgb') // Update selector as needed

  if (searchContainer) {
    const customElement = document.createElement('div')
    customElement.id = 'search-enhancer-root'

    searchContainer.parentNode?.insertBefore(
      customElement,
      searchContainer.nextSibling
    )

    createRoot(customElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  }
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectCustomElement)
} else {
  injectCustomElement()
}
