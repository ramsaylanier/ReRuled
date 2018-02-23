// Containers
import RulesContainer from '../rules-container.vue'

// Components
import RuleListItem from '@/modules/rule/list-item/rule-list-item.vue'

export default {
  name: 'game-rules',
  props: ['game'],
  components: {
    RulesContainer, RuleListItem
  }
}
