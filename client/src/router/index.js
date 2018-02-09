import Vue from 'vue'
import Router from 'vue-router'

// NAVS
import AppNav from '@/components/nav/AppNav.vue'

// PAGES
import Home from '@/pages/Home'
import Games from '@/components/Games'
import Game from '@/pages/game/Game.vue'
import GameRules from '@/pages/game/rules/Rules.vue'
import GameRule from '@/pages/game/rules/Rule.vue'
import GameRulesets from '@/pages/game/rulesets/Rulesets.vue'
import GameRuleset from '@/pages/game/rulesets/Ruleset.vue'
import Profile from '@/pages/profile/Profile.vue'
import Callback from '@/pages/Callback.vue'
import CreateRule from '@/pages/rule/CreateRule.vue'
import CreateRuleset from '@/pages/ruleset/CreateRuleset.vue'

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
      path: '/create-ruleset',
      name: 'Create Ruleset',
      beforeEnter: requireAuth,
      components: {
        page: CreateRuleset
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
            page: GameRulesets
          }
        },
        {
          path: 'rules/:id',
          name: 'Game Rule',
          components: {
            page: GameRules,
            rule: GameRule
          }
        },
        {
          path: 'rulesets/:id',
          name: 'Game Ruleset',
          components: {
            page: GameRulesets,
            rule: GameRuleset
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
