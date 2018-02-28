const state = {
  user: null
}

const getters = {
  currentUser: state => state.user
}

const actions = {
  signUserUp ({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      rootState.auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            email: user.email
          }
          console.log('Usuario creado! ' + newUser.email)
          commit('setUser', newUser)
          resolve()
        })
        .catch(error => {
          throw new Error(error)
        })
    })
  },
  signUserIn ({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      rootState.auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            email: user.email
          }
          console.log(`Bienvenido de vuelta ${newUser.email}`)
          commit('setUser', newUser)
          resolve()
        })
        .catch(error => {
          throw new Error(error)
        })
    })
  },
  autoSignIn ({ commit }, payload) {
    commit('setUser', { id: payload.uid, email: payload.email })
  },
  logout ({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      rootState.auth.signOut()
      commit('setUser', null)
      resolve()
    })
  }
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
