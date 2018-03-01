// Containers
import RulesetsContainer from '@/modules/ruleset/rulesets-container.vue'

// Components
import RulesetListItem from '@/modules/ruleset/list-item/ruleset-list-item.vue'

export default {
  name: 'ruleset-list',
  props: ['game'],
  data () {
    return {
      isMine: this.$route.query.me
    }
  },
  components: {
    RulesetsContainer, RulesetListItem
  }
}
