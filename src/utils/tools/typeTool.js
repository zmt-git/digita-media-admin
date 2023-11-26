export function isType (o, type = 'Object') {
  return Object.prototype.toString.call(o).slice(8, -1) === type
}
