import {TweenMax, Power4} from 'gsap'

import TouchListItem from '@/components/list/touch-list-item/touch-list-item.vue'

import DeleteRuleMutation from '@/graphql/rule/deleteRule.gql'
import RulesCreatedQuery from '@/graphql/me/rulesCreated.gql'

export default {
  name: 'rule-list-item',
  components: {
    TouchListItem
  },
  props: ['rule'],
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
    deleteRule () {
      const {gameId} = this.$route.params
      const ruleId = this.rule.id

      this.$apollo.mutate({
        mutation: DeleteRuleMutation,
        variables: {
          id: ruleId
        },
        update: (store, {data: {deleteRule}}) => {
          const data = store.readQuery({
            query: RulesCreatedQuery,
            variables: {
              gameId: gameId
            }
          })

          data.me.rules = data.me.rules.filter(rule => {
            return rule.id !== ruleId
          })

          store.writeQuery({ query: RulesCreatedQuery, variables: {gameId: gameId}, data })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
