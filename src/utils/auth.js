export function routesFilter (routes = [], userType) {
  const arr = routes.filter(route => {
    if (route.children && route.children.length > 0) {
      route.children = routesFilter(route.children, userType)
    }
    return route.meta && route.meta.auth.includes(userType)
  })

  return arr
}
