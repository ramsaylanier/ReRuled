// Components
import RulesetHeader from '@/modules/ruleset/ruleset-header.vue'
import ListItem from '@/components/list/list-item.vue'
import RuleCategory from '@/modules/rule/category/category.vue'
import RuleText from '@/modules/rule/text/text.vue'

// Queries
import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'
import RulesCreatedQuery from '@/graphql/me/rulesCreated.gql'

// Mutation
import DeleteRulesetMutation from '@/graphql/ruleset/deleteRuleset.gql'

export default {
  name: 'ruleset',
  components: {
    RulesetHeader, ListItem, RuleCategory, RuleText
  },
  props: ['ruleset'],
  data () {
    return {
      menuOpen: false
    }
  },
  apollo: {
    me: {
      query: RulesCreatedQuery,
      variables () {
        return {
          gameId: this.$route.params.gameId
        }
      }
    }
  },
  methods: {
    handleMenuToggle () {
      this.menuOpen = !this.menuOpen
    },
    handleDelete () {
      const confirmed = window.confirm('Do You Really Want To Delete This Ruleset?')

      if (confirmed) {
        this.deleteRuleset()
      }
    },
    deleteRuleset () {
      const {id, title} = this.$route.params

      this.$apollo.mutate({
        mutation: DeleteRulesetMutation,
        variables: {
          id: id
        },
        update: (store, {data: {deleteRule}}) => {
          const data = store.readQuery({
            query: RulesetsCreatedQuery,
            variables: {
              game: title
            }
          })

          const updatedRulesets = data.me.rulesetsCreated.filter(ruleset => {
            return ruleset.id !== id
          })

          data.me.rulesetsCreated = updatedRulesets

          store.writeQuery({ query: RulesetsCreatedQuery, variables: {game: title}, data })
        }
      }).then(r => {
        this.$router.go(-1)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
