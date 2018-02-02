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

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        header: AppHeader,
        page: Home,
        drawerNav: AppNav
      }
    },
    {
      path: '/profile',
      name: 'Profile',
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
      components: {
        header: AppHeader,
        page: Games,
        drawerNav: AppNav
      }
    }
  ]
})

export default router
