const THEME_KEY = 'DigitalMediaTheme'

export function setTheme (theme) {
  localStorage.setItem(THEME_KEY, theme)
}

export function getTheme () {
  localStorage.getItem(THEME_KEY)
}

export function removeTheme () {
  localStorage.removeItem(THEME_KEY)
}
