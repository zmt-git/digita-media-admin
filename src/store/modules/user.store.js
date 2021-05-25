import { login, logout } from '@/api/system/login'
import { removeToken } from '@/utils/cache/cacheToken'

export default {
  state: {
    user: {}
  },

  mutations: {
    set_user (state, user) {
      state.user = user
    }
  },

  actions: {
    loginActions ({ commit }, params) {
      return new Promise((resolve, reject) => {
        login(params)
          .then(res => {
            commit('set_user', res.result)
            resolve(res)
          })
          .catch(e => reject(e))
      })
    },

    logoutActions ({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(res => {
            commit('set_user', {})
            removeToken()
            resolve(res)
          })
          .catch(e => reject(e))
      })
    }
  }
}
