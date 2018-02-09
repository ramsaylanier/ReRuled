import Vue from 'vue'
import Router from 'vue-router'

// NAVS
import AppNav from '@/components/nav/AppNav.vue'

// PAGES
import Home from '@/components/Home'
import Games from '@/components/Games'
import Game from '@/components/pages/game/Game.vue'
import GameRules from '@/components/pages/game/rules/Rules.vue'
import GameRule from '@/components/pages/game/rules/Rule.vue'
import Profile from '@/components/pages/profile/Profile.vue'
import Callback from '@/components/pages/Callback.vue'
import CreateRule from '@/components/pages/rule/CreateRule.vue'

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
        page: Profile,
        drawerContent: AppNav
      }
    },
    {
      path: '/create-rule',
      name: 'Create Rule',
      beforeEnter: requireAuth,
      components: {
        page: CreateRule
      }
    },
    {
      path: '/game/:title',
      name: 'Game',
      beforeEnter: requireAuth,
      components: {
        page: Game
      },
      children: [
        {
          path: 'rules',
          name: 'Game Rules',
          components: {
            page: GameRules
          }
        },
        {
          path: 'rulesets',
          name: 'Game Rulesets',
          components: {
            page: GameRules
          }
        },
        {
          path: 'rules/:id',
          name: 'Game Rule',
          components: {
            page: GameRules,
            rule: GameRule
          }
        }
      ]
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
        page: Games,
        drawerNav: AppNav
      }
    }
  ]
})

export default router
