// Containers
import RulesetsContainer from '@/modules/ruleset/ruleset-container.vue'

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
