import Vue from 'vue'
import Vuex from 'vuex'
import uiModule from './modules/ui'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    uiModule
  },
  strict: debug
})

export default store
