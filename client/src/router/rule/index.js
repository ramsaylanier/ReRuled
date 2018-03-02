// ROUTES
import CreateRule from './createRule'

// GAME VIEWS
import Rule from '@/views/rule/rule.vue'

import { requireAuth } from '@/router/hooks'
export default [
  {
    path: '/game/:gameId/rule/:ruleId',
    name: 'Rule',
    beforeEnter: requireAuth,
    components: {
      page: Rule
    }
  },
  CreateRule
]
