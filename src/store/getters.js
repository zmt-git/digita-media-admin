export default {
  user: state => state.user.user,
  load: state => state.user.load,
  userType: state => state.user.userType,
  routes: state => state.routes.routes,
  visitedViews: state => state.tagView.visitedViews,
  pageLoadingState: state => state.app.pageLoadingState
}
