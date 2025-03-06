import { useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'

interface IPhoneContextValue {
  isIPhone: boolean
  showFilters: boolean
}
export const IPhoneContext = createContext<IPhoneContextValue>({
  isIPhone: false,
  showFilters: true,
})

// Provider component
export function IPhoneProvider({
  rootElement,
  children,
}: {
  children: React.ReactNode
  rootElement: HTMLDivElement
}) {
  const [showFilters, setShowFilters] = useState(true)
  const isIPhone = useMemo(() => isIPhoneDevice(), [])

  useEffect(() => {
    if (!isIPhone) {
      return
    }

    let header: HTMLHeadElement | undefined
    try {
      const shadowRoot = rootElement.parentNode as ShadowRoot
      const hostElement = shadowRoot.host as HTMLElement
      header = hostElement.closest('header') as HTMLHeadElement
    } catch (e: unknown) {
      console.error('Failed to find header:', e)
    }

    if (!header) {
      return
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation)
        if (mutation.attributeName === 'class') {
          const newClasses = (mutation.target as HTMLHeadElement).className
          const showFilters = newClasses.includes('noscroll')
          setShowFilters(showFilters)
        }
      })
    })

    // Configure the observer to watch for attribute changes
    observer.observe(header, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Cleanup
    return () => observer.disconnect()
  }, [isIPhone, rootElement])

  const value = useMemo(
    () => ({
      isIPhone,
      showFilters,
    }),
    [isIPhone, showFilters]
  )
  return (
    <IPhoneContext.Provider value={value}>{children}</IPhoneContext.Provider>
  )
}

export function isIPhoneDevice() {
  return navigator.userAgent.match(/IPhone/i) !== null
}
