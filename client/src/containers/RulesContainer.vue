<template>
  <div>
    <slot :rules="rules"></slot>
  </div>
</template>

<script>
// Queries
import RulesCreatedQuery from '@/graphql/me/rulesCreated.gql'
import GameRulesQuery from '@/graphql/rule/gameRules.gql'

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
      }
    }
  }
}
</script>

<style>

</style>
