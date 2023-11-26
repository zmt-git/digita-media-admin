import { isType } from '../tools/typeTool'

export function removeEmptyParams (config) {
  if (config.data) config.data = removeEmpty(config.data)
  if (config.params) config.params = removeEmpty(config.params)
}

function removeEmpty (p) {
  if (!isType(p)) return p
  const obj = JSON.parse(JSON.stringify(p))
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key]
    }
    if (isType(obj[key])) {
      obj[key] = removeEmpty(obj[key])
    }
  }
  return obj
}
