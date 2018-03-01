<template>
  <div>
    <slot v-if="ruleset" :ruleset="ruleset" :loading="loading"></slot>
  </div>
</template>

<script>
// Queries
import RulesetQuery from '@/graphql/ruleset/ruleset.gql'

export default {
  name: 'ruleset-container',
  data () {
    return {
      ruleset: {},
      loading: 0
    }
  },
  apollo: {
    ruleset: {
      query: RulesetQuery,
      loadingKey: 'loading',
      variables () {
        return {
          id: this.$route.params.rulesetId
        }
      }
    }
  }
}
</script>
