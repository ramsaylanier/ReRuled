<template>
  <list v-if="me.rulesetsCreated && me.rulesetsCreated.length > 0"> 
    <ruleset-list-item v-for="ruleset in me.rulesetsCreated" :key="ruleset.id" :ruleset="ruleset"/>
  </list>
</template>

<script>
// Components
import List from '@/components/list/List.vue'
import RulesetListItem from '@/components/ruleset/RulesetListItem.vue'

// Queries
import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'

export default {
  name: 'game-rules',
  components: {
    List, RulesetListItem
  },
  data () {
    return {
      me: {}
    }
  },
  apollo: {
    me: {
      query: RulesetsCreatedQuery,
      variables () {
        return {
          gameId: this.$route.params.gameId
        }
      }
    }
  }
}
</script>

<style>

</style>
