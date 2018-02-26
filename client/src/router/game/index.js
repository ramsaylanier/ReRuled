// ROUTES
import Rules from './children/rules/index.js'
import Rulesets from './children/rulesets/index.js'

// GAME VIEWS
import Game from '@/views/game/game.vue'

import { requireAuth } from '@/router/hooks'
export default [
  {
    path: '/game/:gameId',
    beforeEnter: requireAuth,
    components: {
      page: Game
    },
    children: [
      ...Rules,
      ...Rulesets
    ]
  }
]
