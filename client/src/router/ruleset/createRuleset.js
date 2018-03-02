import {requireAuth} from '@/router/hooks'
import CreateRuleset from '@/views/ruleset/create-ruleset.vue'

export default {
  path: '/create-ruleset',
  name: 'Create Ruleset',
  beforeEnter: requireAuth,
  components: {
    page: CreateRuleset
  },
  meta: {
    prefill: null
  }
}
