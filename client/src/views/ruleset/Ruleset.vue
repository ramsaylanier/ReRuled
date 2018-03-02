<template>
  <ruleset-container>
    <ruleset slot-scope="data" :ruleset="data.ruleset" v-if="!data.loading"/>
  </ruleset-container>
</template>

<script>
// Containers
import RulesetContainer from '@/modules/ruleset/ruleset-container.vue'

// Components
import Ruleset from '@/modules/ruleset/ruleset.vue'

export default {
  name: 'ruleset-view',
  components: {
    RulesetContainer, Ruleset
  }
}
</script>
