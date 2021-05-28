import { stableRoutes } from '@/router/routes/stableRoutes'

export default {
  state: {
    stableRoutes: stableRoutes,
    routes: stableRoutes
  },

  mutations: {
    set_routes (state, asyncRoutes) {
      state.routes = stableRoutes.concat(asyncRoutes)
    }
  }
}
