// Containers
import RulesContainer from '../rules-container.vue'

// Components
import List from '@/components/list/List.vue'
import RuleListItem from '@/modules/rule/list-item/rule-list-item.vue'

export default {
  name: 'game-rules',
  props: ['game'],
  components: {
    RulesContainer, List, RuleListItem
  }
}
