import {requireAuth} from '@/router/hooks'
import CreateRule from '@/views/rule/create-rule.vue'

export default {
  path: '/create-rule',
  name: 'Create Rule',
  beforeEnter: requireAuth,
  components: {
    page: CreateRule
  }
}
