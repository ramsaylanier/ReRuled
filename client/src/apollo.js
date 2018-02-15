import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import {merge} from 'lodash'

import uiState from '@/state/ui'

const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ``
    }
  }
})

const wsClient = new SubscriptionClient('ws://localhost:4466/srv/dev', {
  reconnect: true
})

const wsLink = new WebSocketLink(wsClient)

const link = withClientState({
  ...merge(uiState),
  cache
}).concat(
  new HttpLink({
    uri: `http://localhost:4000`
  })
)

// Create the apollo client
const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, link, wsLink]),
  cache,
  connectToDevTools: true
})

Vue.use(VueApollo)

export {apolloClient}
