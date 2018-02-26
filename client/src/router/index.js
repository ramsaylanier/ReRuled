import Vue from 'vue'
import Router from 'vue-router'

// NAVS
import AppNav from '@/components/nav/AppNav.vue'

// VIEWS
import Home from '@/views/Home'

// GAME VIEWS
import Game from '@/views/game/game.vue'
import Rules from '@/views/game/children/rules.vue'
import Rulesets from '@/views/game/children/rulesets.vue'

import Rule from '@/views/rule/Rule.vue'
import CreateRule from '@/views/rule/CreateRule.vue'

import Ruleset from '@/views/ruleset/Ruleset.vue'
import CreateRuleset from '@/views/ruleset/CreateRuleset.vue'

import Profile from '@/views/profile/Profile.vue'
import Callback from '@/views/Callback.vue'

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
      path: '/create-rule',
      name: 'Create Rule',
      beforeEnter: requireAuth,
      components: {
        page: CreateRule
      }
    },
    {
      path: '/create-ruleset',
      name: 'Create Ruleset',
      beforeEnter: requireAuth,
      components: {
        page: CreateRuleset
      },
      meta: {
        prefill: null
      }
    },
    {
      path: '/game/:gameId',
      beforeEnter: requireAuth,
      components: {
        page: Game
      },
      children: [
        {
          path: 'rules',
          name: 'Game Rules',
          components: {
            detail: Rules
          },
          meta: {
            withNav: true,
            showModal: false
          }
        },
        {
          path: 'rulesets',
          name: 'Game Rulesets',
          components: {
            detail: Rulesets
          },
          meta: {
            withNav: true,
            showModal: false
          }
        },
        {
          path: 'rules/:id',
          name: 'Game Rule',
          components: {
            detail: Rules,
            modal: Rule
          },
          meta: {
            showModal: true
          }
        },
        {
          path: 'rulesets/:id',
          name: 'Game Ruleset',
          components: {
            detail: Rulesets,
            modal: Ruleset
          },
          meta: {
            showModal: true
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
    }
  ]
})

export default router
