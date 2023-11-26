const modules = {}

const modulesRequires = require.context('../modules', true, /\.store\.js$/)

modulesRequires.keys().forEach(filename => {
  const moduleConfig = modulesRequires(filename)

  const moduleName = filename.split('/').pop().replace(/\.store\.js$/, '')

  modules[moduleName] = moduleConfig.default
})

export default modules
