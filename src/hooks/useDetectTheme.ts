import { useEffect, useState } from 'react'

export function useDetectTheme() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(isDarkMode)

    function themeListener(e: MediaQueryListEvent) {
      if (e.matches) {
        setIsDark(true)
      } else {
        setIsDark(false)
      }
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', themeListener)

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', themeListener)
    }
  }, [])

  return {
    isDark,
    isLight: !isDark,
    theme: isDark ? 'dark' : 'light',
  }
}
