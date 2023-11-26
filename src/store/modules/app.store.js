let timeId = null
export default {
  state: {
    pageLoadingState: false
  },
  mutations: {
    commitPageLoadingState (state, pageLoadingState) {
      state.pageLoadingState = pageLoadingState
    }
  },
  actions: {
    actionsPageLoadingState ({ commit }, loading) {
      if (loading) {
        clearTimeout(timeId)
        timeId = setTimeout(() => {
          commit('commitPageLoadingState', loading)
        }, 1000)
      } else {
        commit('commitPageLoadingState', loading)
        clearTimeout(timeId)
      }
    }
  }
}
