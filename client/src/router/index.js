import Vue from 'vue'
import Router from 'vue-router'

// HEADERS
import AppHeader from '@/components/header/AppHeader.vue'

// NAVS
import AppNav from '@/components/nav/AppNav.vue'

// PAGES
import Home from '@/components/Home'
import Games from '@/components/Games'
import Profile from '@/components/pages/profile/Profile.vue'
import Callback from '@/components/pages/Callback.vue'

import { checkAuthentication } from '@/auth'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (checkAuthentication()) {
    next()
  } else {
    next('/')
  }
}

function redirectToProfile (to, from, next) {
  if (checkAuthentication()) {
    next('/profile')
  } else {
    next()
  }
}

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
      path: '/profile',
      name: 'Profile',
      beforeEnter: requireAuth,
      components: {
        header: AppHeader,
        page: Profile,
        drawerNav: AppNav
      }
    },
    {
      path: '/callback',
      name: 'Callback',
      components: {
        page: Callback
      }
    },
    {
      path: '/games',
      name: 'Games',
      beforeEnter: requireAuth,
      components: {
        header: AppHeader,
        page: Games,
        drawerNav: AppNav
      }
    }
  ]
})

export default router
