import Rulesets from '@/views/game/children/rulesets.vue'
import Ruleset from '@/views/ruleset/Ruleset.vue'

export default {
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
