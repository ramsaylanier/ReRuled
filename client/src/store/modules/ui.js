import * as types from '../mutation-types'

// initial state
const state = {
  drawerIsOpen: false
}

// getters
const getters = {
  drawerIsOpen: state => state.drawerIsOpen
}

// actions
const actions = {
  toggleDrawer ({commit}) {
    commit(types.TOGGLE_DRAWER)
  }
}

// mutations
const mutations = {
  [types.TOGGLE_DRAWER] (state) {
    state.drawerIsOpen = !state.drawerIsOpen
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
