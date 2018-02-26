<template>
  <div>
    <slot v-if="rules" :rules="rules"></slot>
  </div>
</template>

<script>
// Queries
import RulesCreatedQuery from '@/graphql/me/rulesCreated.gql'
import GameRulesQuery from '@/graphql/rule/gameRules.gql'

// Subscriptions
import RuleAddedSubscription from '@/graphql/rule/subscriptions/ruleAdded.gql'

export default {
  name: 'rules-container',
  apollo: {
    rules: {
      query () {
        if (this.$route.query.me) {
          return RulesCreatedQuery
        } else {
          return GameRulesQuery
        }
      },
      variables () {
        return {
          gameId: this.$route.params.gameId
        }
      },
      update (data) {
        return data.me ? data.me.rules : data.rules
      },
      subscribeToMore: {
        document: RuleAddedSubscription,
        variables () {
          return {
            gameId: this.$route.params.gameId
          }
        },
        updateQuery (prev, {subscriptionData}) {
          console.log(subscriptionData)
          const newRule = subscriptionData.data.ruleAdded.node
          return Object.assign({}, prev, {
            rules: [newRule, ...prev.rules]
          })
        }
      }
    }
  }
}
</script>
