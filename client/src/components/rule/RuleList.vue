<template>
  <ul class="list">
    <rule-list-item v-for="rule in rules" :key="rule.id" :rule="rule"/>
  </ul>
</template>

<script>
import RuleListItem from './RuleListItem.vue'
export default {
  name: 'rule-list',
  props: ['rules'],
  components: {
    RuleListItem
  }
}
</script>

<style>

</style>
