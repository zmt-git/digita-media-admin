export default {
  state: {
    visitedViews: [
      { title: '智能终端', path: '/device/deviceList' }
    ]
  },

  mutations: {
    add_visited_views (state, view) {
      const index = state.visitedViews.findIndex(v => v.path === view.path)
      if (index >= 0) {
        const obj = Object.assign({}, view, { title: view.meta.title || 'no-name' })
        state.visitedViews.splice(index, 1, obj)
        return
      }
      state.visitedViews.push(Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      }))
    },
    delete_visited_views (state, view) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    delete_all_visited_views (state) {
      state.visitedViews = []
    }
  },

  actions: {
    addViews ({ commit }, view) {
      commit('add_visited_views', view)
    },
    delViews ({ commit }, view) {
      commit('delete_visited_views', view)
    },
    delAllViews ({ commit }) {
      commit('delete_all_visited_views')
    }
  }
}
