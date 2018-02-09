<template>
  <ul class="list">
    <rule-list-item v-for="rule in rules" :key="rule.id" :rule="rule"/>
  </ul>
</template>

<script>
import RuleListItem from './RulesetListItem.vue'
export default {
  name: 'rule-list',
  props: ['rules'],
  components: {
    RuleListItem
  }
}
</script>

<style>
  .list{
    margin: 0;
    padding: 1rem;
  }

  .rule{
    margin-bottom: 1rem;
  }
</style>
