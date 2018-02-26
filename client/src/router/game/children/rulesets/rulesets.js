import Rulesets from '@/views/game/children/rulesets.vue'

export default {
  path: 'rulesets',
  name: 'Game Rulesets',
  components: {
    detail: Rulesets
  },
  meta: {
    withNav: true,
    showModal: false
  }
}
