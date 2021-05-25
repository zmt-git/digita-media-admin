const collapseKey = 'accountCollapse'

export function setCollapse (collapse, key = collapseKey) {
  localStorage.setItem(key, collapse)
}

export function getCollapse (key = collapseKey) {
  return localStorage.getItem(key)
}

export function removeCollapse (key = collapseKey) {
  localStorage.removeItem(key)
}
