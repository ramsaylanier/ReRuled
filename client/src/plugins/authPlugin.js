import Auth from '@/auth'

const AuthPlugin = {
  install (Vue, options) {
    const auth = new Auth((result) => console.log('auth result', result), options.client)
    const {login, logout} = auth

    Vue.prototype.$auth = auth
    Vue.prototype.$login = login
    Vue.prototype.$logout = logout
  }
}

export default AuthPlugin
