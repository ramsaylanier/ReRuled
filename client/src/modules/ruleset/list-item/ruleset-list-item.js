import {TweenMax, Power4} from 'gsap'

import TouchListItem from '@/components/list/touch-list-item/touch-list-item.vue'

import DeleteRulesetMutation from '@/graphql/ruleset/deleteRuleset.gql'
import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'

export default {
  name: 'ruleset-list-item',
  components: {
    TouchListItem
  },
  props: ['ruleset', 'isMine'],
  data () {
    return {
      dragDirection: 'panleft'
    }
  },
  methods: {
    handleLeave (el, done) {
      TweenMax.to(el, 0.5, {
        x: 50,
        alpha: 0,
        ease: Power4.easeOut,
        onComplete: done
      })
    },
    deleteRuleset () {
      const {gameId} = this.$route.params
      const rulesetId = this.ruleset.id

      this.$apollo.mutate({
        mutation: DeleteRulesetMutation,
        variables: {
          id: rulesetId
        },
        update: (store, {data: {deleteRuleset}}) => {
          const data = store.readQuery({
            query: RulesetsCreatedQuery,
            variables: {
              gameId: gameId
            }
          })

          console.log(data)

          data.me.rulesets = data.me.rulesets.filter(ruleset => {
            return ruleset.id !== rulesetId
          })

          store.writeQuery({ query: RulesetsCreatedQuery, variables: {gameId: gameId}, data })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
