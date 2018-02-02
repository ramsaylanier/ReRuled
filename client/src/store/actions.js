import * as types from './mutation-types'

const setCurrentUser = ({commit}, currentUser) => {
  commit(types.SET_CURRENT_USER, currentUser)
}

export { setCurrentUser }
