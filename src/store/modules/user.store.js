import { login, logout, smsLogin } from '@/api/system/login'
import { infoUser } from '@/api/user'
import { removeToken, setToken } from '@/utils/cache/cacheToken'

export default {
  state: {
    user: {},
    load: false,
    userType: -1
  },

  mutations: {
    set_user (state, user) {
      state.user = user
    },
    set_load (state, load) {
      state.load = load
    },
    set_user_type (state, userType) {
      state.userType = userType
    }
  },

  actions: {
    infoUserActions ({ commit }) {
      return new Promise((resolve, reject) => {
        infoUser()
          .then(res => {
            commit('set_user', res.user)
            commit('set_user_type', res.user.userType)
            commit('set_load', true)
            resolve(res)
          })
          .catch(e => reject(e))
      })
    },

    loginActions (state, params) {
      return new Promise((resolve, reject) => {
        login(params)
          .then(res => {
            setToken(res.token)
            resolve(res)
          })
          .catch(e => reject(e))
      })
    },

    loginCodeActions (state, params) {
      return new Promise((resolve, reject) => {
        smsLogin(params)
          .then(res => {
            setToken(res.data.token)
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
