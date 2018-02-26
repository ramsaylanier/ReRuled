import Rules from '@/views/game/children/rules.vue'
import Rulesets from '@/views/game/children/rulesets.vue'

export default {
  path: 'rules/:id/addToRuleset',
  name: 'Add Rule to Rulesets',
  components: {
    detail: Rules,
    modal: Rulesets
  },
  meta: {
    showModal: true
  }
}
