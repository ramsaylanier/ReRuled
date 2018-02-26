import Rules from '@/views/game/children/rules.vue'
import Rule from '@/views/rule/Rule.vue'

export default {
  path: 'rules/:id',
  name: 'Game Rule',
  components: {
    detail: Rules,
    modal: Rule
  },
  meta: {
    showModal: true
  }
}
