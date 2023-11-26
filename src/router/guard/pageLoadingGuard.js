import store from '@/store'

export function createPageLoadingGuard (router) {
  router.beforeEach((to, from, next) => {
    store.dispatch('actionsPageLoadingState', true)
    next()
  })

  router.afterEach(() => {
    setTimeout(() => {
      store.dispatch('actionsPageLoadingState', false)
    }, 300)
  })
}
