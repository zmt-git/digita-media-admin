import { getTheme, setTheme } from '@/utils/cache/cacheTheme'

export function useTheme () {
  let currentTheme
  getTheme() ? currentTheme = getTheme() : currentTheme = 'light'

  function setThemes () {
    window.document.documentElement.setAttribute('data-theme', currentTheme)
    setTheme(currentTheme)
  }

  return {
    currentTheme,
    setThemes
  }
}
