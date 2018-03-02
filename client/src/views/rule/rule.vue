<template>
  <rule-container>
    <rule slot-scope="data" :rule="data.rule" v-if="!data.loading"/>
  </rule-container>
</template>

<script>
// Containers
import RuleContainer from '@/modules/rule/rule-container.vue'

// Components
import Rule from '@/modules/rule/rule.vue'

export default {
  name: 'rule-view',
  components: {
    RuleContainer, Rule
  }
}
</script>
