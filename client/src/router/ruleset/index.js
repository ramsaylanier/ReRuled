import CreateRuleset from './createRuleset'
import Ruleset from '@/views/ruleset/ruleset.vue'

import { requireAuth } from '@/router/hooks'
export default [
  {
    path: '/game/:gameId/ruleset/:rulesetId',
    name: 'Ruleset',
    beforeEnter: requireAuth,
    components: {
      page: Ruleset
    }
  },
  CreateRuleset
]
