const modules = {}
const requireModules = require.content('./', true, /\.store\.js$/)
requireModules.keys().forEach(filename => {
  const moduleConfig = requireModules(filename).default

  const moduleName = filename.split('/').pop().replace(/\.store\.js$/, '')

  modules[moduleName] = moduleConfig
})

export default modules
