import * as types from '../mutation-types'

// initial state
const state = {
  currentUser: null
}

// getters
const getters = {
  currentUser: state => state.currentUser
}

// actions
const actions = {
  setCurrentUser ({commit}, currentUser) {
    commit(types.SET_CURRENT_USER, currentUser)
  }
}

// mutations
const mutations = {
  [types.SET_CURRENT_USER] (state, currentUser) {
    state.currentUser = currentUser
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
