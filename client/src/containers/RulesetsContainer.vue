<template>
  <div>
    <slot :rulesets="rulesets" :loading="$apollo.queries.rulesets.loading"></slot>
  </div>
</template>

<script>
// Queries
import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'
import GameRulesetsQuery from '@/graphql/ruleset/gameRulesets.gql'

export default {
  name: 'rulesets-container',
  data () {
    return {
      rulesets: []
    }
  },
  apollo: {
    rulesets: {
      query () {
        if (this.$route.query.me) {
          return RulesetsCreatedQuery
        } else {
          return GameRulesetsQuery
        }
      },
      variables () {
        return {
          gameId: this.$route.params.gameId
        }
      },
      update (data) {
        return data.me ? data.me.rulesets : data.rulesets
      }
    }
  }
}
</script>

<style>

</style>
