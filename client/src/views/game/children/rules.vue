<template>
  <rule-list :game="game"/>
</template>

<script>
// Containers
import RuleList from '@/modules/rule/list/rule-list.vue'

export default {
  name: 'game-rulessets',
  props: ['game'],
  components: {
    RuleList
  }
}
</script>
