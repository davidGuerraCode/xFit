import * as store from '../Store/index.js'

export default (to, from, next) => {
  // console.log(store.default.getters['user/currentUser'])
  if (store.default.getters['user/currentUser'] !== null && store.default.getters['user/currentUser'] !== undefined) {
    next()
  } else {
    next('/signin')
  }
}
