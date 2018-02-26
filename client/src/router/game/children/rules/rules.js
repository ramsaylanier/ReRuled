import Rules from '@/views/game/children/rules.vue'

export default {
  path: 'rules',
  name: 'Game Rules',
  components: {
    detail: Rules
  },
  meta: {
    withNav: true,
    showModal: false
  }
}
