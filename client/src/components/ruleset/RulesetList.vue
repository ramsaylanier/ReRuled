<template>
  <list>
    <ruleset-list-item v-for="ruleset in rulesets" :key="ruleset.id" :ruleset="ruleset"/>
  </list>
</template>

<script>
import List from '@/components/list/List'
import RulesetListItem from './RulesetListItem.vue'
export default {
  name: 'ruleset-list',
  props: ['rulesets'],
  components: {
    List, RulesetListItem
  }
}
</script>

<style>

</style>
