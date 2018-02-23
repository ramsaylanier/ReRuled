<template>
  <ruleset-list :game="game"/>
</template>

<script>
// Containers
import RulesetList from '@/modules/ruleset/list/ruleset-list.vue'

export default {
  name: 'game-rulessets',
  props: ['game'],
  components: {
    RulesetList
  }
}
</script>
