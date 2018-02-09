<template>
  <list v-if="me.rulesCreated && me.rulesCreated.length > 0"> 
    <rule-list-item v-for="rule in me.rulesCreated" :key="rule.id" :rule="rule"/>
  </list>
</template>

<script>
import gql from 'graphql-tag'
import List from '@/components/list/List.vue'
import RuleListItem from '@/components/rule/RuleListItem.vue'
export default {
  name: 'game-rules',
  components: {
    List, RuleListItem
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
            rulesCreated(where: {game: {title: $title}}){
              id
              ruleText
              categories
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
