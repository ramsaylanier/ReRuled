<template>
  <rules-container>
    <list slot-scope="data" v-if="!data.loading">
      <div class="warning" v-if="data.rules.length === 0">
        <p>There are no rules for this game</p>
        <router-link class="button --primary" :to="{name: 'Create Rule', query: {game: game.title}}">Create One</router-link>
      </div> 
      <rule-list-item 
        v-else
        v-for="rule in data.rules"
        :key="rule.id"
        :rule="rule"
      />
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
  props: ['game'],
  components: {
    RulesContainer, List, RuleListItem
  }
}
</script>

<style scoped lang="scss">
  .warning{
    padding :1rem;
    background-color: white;
  }
</style>