// Containers
import RuleContainer from '@/modules/rule/rule-container.vue'

// Components
import RuleHeader from '@/modules/rule/rule-header.vue'
import Popover from '@/components/popover/Popover'
import RulesetList from '@/modules/ruleset/list/ruleset-list.vue'

// Queries
import RulesCreatedQuery from '@/graphql/me/rulesCreated.gql'
// import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'

// Mutations
import DeleteRuleMutation from '@/graphql/rule/deleteRule.gql'
import AddRuleMutation from '@/graphql/ruleset/addRuleToRuleset.gql'

export default {
  name: 'rule',
  components: {
    RuleContainer, RuleHeader, Popover, RulesetList
  },
  data () {
    return {
      showPopover: false
    }
  },
  // apollo: {
  //   me: {
  //     query: RulesetsCreatedQuery,
  //     variables () {
  //       return {
  //         where: {}
  //       }
  //     }
  //   }
  // },
  methods: {
    togglePopover () {
      this.showPopover = !this.showPopover
    },
    handleDelete () {
      const confirmed = window.confirm('Do You Really Want To Delete This Rule?')

      if (confirmed) {
        this.deleteRule()
      }
    },
    handleAddToRuleset (ruleset) {
      const rulesetId = ruleset.id
      const ruleId = this.rule.id

      this.$apollo.mutate({
        mutation: AddRuleMutation,
        variables: {
          rulesetId: rulesetId,
          ruleId: ruleId
        }
      }).then(r => {
        this.showPopover = false
      })
    },
    deleteRule () {
      const {id, title} = this.$route.params
      const rulesQuery = RulesCreatedQuery

      this.$apollo.mutate({
        mutation: DeleteRuleMutation,
        variables: {
          id: id
        },
        update: (store, {data: {deleteRule}}) => {
          const data = store.readQuery({
            query: rulesQuery,
            variables: {
              title: title
            }
          })

          const updatedRules = data.me.rulesCreated.filter(rule => {
            return rule.id !== id
          })

          data.me.rulesCreated = updatedRules

          store.writeQuery({ query: rulesQuery, variables: {title: title}, data })
        }
      }).then(r => {
        this.$router.go(-1)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
