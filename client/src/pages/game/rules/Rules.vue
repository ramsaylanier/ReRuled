<template>
  <rules-container>
    <list slot-scope="data" v-if="!data.loading"> 
      <rule-list-item v-for="rule in data.rules" :key="rule.id" :rule="rule"/>
    </list>
  </rules-container>
</template>

<script>
// Containers
import RulesContainer from '@/containers/RulesContainer.vue'

// Components
import List from '@/components/list/List.vue'
import RuleListItem from '@/components/rule/RuleListItem.vue'

export default {
  name: 'game-rules',
  components: {
    RulesContainer, List, RuleListItem
  }
}
</script>
