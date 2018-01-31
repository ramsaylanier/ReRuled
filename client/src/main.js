import Vue from 'vue'
import App from './App'
import router from './router'
import {apolloClient} from './apollo'
import VueApollo from 'vue-apollo'
import VueResource from 'vue-resource'
import AuthPlugin from './plugins/authPlugin'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(AuthPlugin, {
  client: apolloClient
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  store,
  router,
  template: '<App/>',
  components: { App }
})
