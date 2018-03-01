// Containers
import RulesetContainer from '@/modules/ruleset/ruleset-container.vue'

// Components
import RulesetHeader from '@/modules/ruleset/ruleset-header.vue'
import Popover from '@/components/popover/Popover'

// Queries

import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'
import RulesCreatedQuery from '@/graphql/me/rulesCreated.gql'

// Mutation
import DeleteRulesetMutation from '@/graphql/ruleset/deleteRuleset.gql'

export default {
  name: 'ruleset',
  components: {
    RulesetContainer, RulesetHeader, Popover
  },
  data () {
    return {
      showPopover: false
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
    togglePopover () {
      this.showPopover = !this.showPopover
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
