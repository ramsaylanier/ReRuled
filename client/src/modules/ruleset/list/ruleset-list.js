// Containers
import RulesetsContainer from '@/containers/RulesetsContainer.vue'

// Components
import List from '@/components/list/List.vue'
import RulesetListItem from '@/components/ruleset/RulesetListItem.vue'

export default {
  name: 'ruleset-list',
  props: ['game'],
  components: {
    RulesetsContainer, List, RulesetListItem
  }
}
