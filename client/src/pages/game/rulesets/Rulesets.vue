<template>
  <list v-if="me.rulesetsCreated && me.rulesetsCreated.length > 0"> 
    <ruleset-list-item v-for="ruleset in me.rulesetsCreated" :key="ruleset.id" :ruleset="ruleset"/>
  </list>
</template>

<script>
import gql from 'graphql-tag'
import List from '@/components/list/List.vue'
import RulesetListItem from '@/components/ruleset/RulesetListItem.vue'
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
      query: gql`
        query Me($title: String!){
          me{
            rulesetsCreated(where: {game: {title: $title}}){
              id
              name
            }
          }
        }
      `,
      variables () {
        return {
          title: this.$route.params.title
        }
      }
    }
  }
}
</script>

<style>

</style>
