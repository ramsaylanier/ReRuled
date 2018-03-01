<template>
  <div>
    <slot v-if="rule" :rule="rule" :loading="loading"></slot>
  </div>
</template>

<script>
// Queries
import RuleQuery from '@/graphql/rule/rule.gql'

export default {
  name: 'rules-container',
  data () {
    return {
      rule: {},
      loading: 0
    }
  },
  apollo: {
    rule: {
      query: RuleQuery,
      loadingKey: 'loading',
      variables () {
        return {
          id: this.$route.params.ruleId
        }
      }
    }
  }
}
</script>
