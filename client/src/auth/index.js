import auth0 from 'auth0-js'
import gql from 'graphql-tag'
import EventEmitter from 'eventemitter3'
import router from '../router'

export function checkAuthentication () {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

const AUTHENTICATE = gql`
  mutation authenticate($idToken: String!) {
    authenticate(idToken: $idToken) {
        id
        name
        email
    }
  }
`

class Auth {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  auth0 = new auth0.WebAuth({
    domain: 'squadlist.auth0.com',
    clientID: 'oiebZgJKLJOM03YjslgbVTalB8yKQvaa',
    redirectUri: 'http://localhost:8080/callback',
    audience: 'https://squadlist.auth0.com/api/v2/',
    responseType: 'token id_token',
    scope: 'openid profile email user_metadata app_metadata picture'
  })

  constructor (cb, apolloClient) {
    this.handleAuthentication()
    // binds functions to keep this context
    this.apolloClient = apolloClient
    this.cb = cb.bind(this)
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.push({name: 'Profile'})
      } else if (err) {
        console.log(err)
        router.replace({name: 'Home'})
      }
    })
  }

  setSession (authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      )
      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('expires_at', expiresAt)
      const data = {
        status: `success`,
        accessToken: authResult.accessToken,
        idToken: authResult.idToken,
        expiresAt
      }
      this.signinOrCreateAccount({ ...data })
      this.authNotifier.emit('authChange', { authenticated: true })
    }
  }

  signinOrCreateAccount ({ accessToken, idToken, expiresAt }) {
    this.apolloClient
      .mutate({
        mutation: AUTHENTICATE,
        variables: { idToken }
      })
      .then(res => {

      }).catch(err => {
        console.log('Sign in or create account error: ', err)
        this.logout()
      })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace({name: 'Home'})
  }

  isAuthenticated () {
    return checkAuthentication()
  }
}

export default Auth
