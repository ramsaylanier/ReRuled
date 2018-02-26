import Vue from 'vue'
import Router from 'vue-router'

// ROUTES
import GameRoutes from './game'
import RuleRoutes from './rule'
import RulesetRoutes from './ruleset'

// NAVS
import AppNav from '@/components/nav/AppNav.vue'

// VIEWS
import Home from '@/views/Home'
import Profile from '@/views/profile/Profile.vue'
import Callback from '@/views/Callback.vue'

import {redirectToProfile, requireAuth} from './hooks'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      beforeEnter: redirectToProfile,
      components: {
        page: Home
      }
    },
    {
      path: '/browse',
      name: 'Browse',
      beforeEnter: redirectToProfile,
      components: {
        page: Home
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      beforeEnter: requireAuth,
      components: {
        page: Profile,
        drawerContent: AppNav
      }
    },
    {
      path: '/callback',
      name: 'Callback',
      components: {
        page: Callback
      }
    },
    ...GameRoutes,
    ...RuleRoutes,
    ...RulesetRoutes
  ]
})

export default router
