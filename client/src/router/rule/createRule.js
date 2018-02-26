import {requireAuth} from '@/router/hooks'
import CreateRule from '@/views/rule/CreateRule.vue'

export default {
  path: '/create-rule',
  name: 'Create Rule',
  beforeEnter: requireAuth,
  components: {
    page: CreateRule
  }
}
