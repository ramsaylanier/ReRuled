<template>
  <rulesets-container>
    <list slot-scope="data" v-if="!data.loading">
      <div class="warning" v-if="data.rulesets.length === 0">
        <p>There are no rulesets for this game</p>
        <router-link class="button --secondary" :to="{name: 'Create Ruleset', query: {game: game.title}}">Create One</router-link>
      </div>
      <ruleset-list-item 
        v-else
        v-for="ruleset in data.rulesets"
        :key="ruleset.id"
        :ruleset="ruleset"
      />
    </list>
  </rulesets-container>
</template>

<script>
// Containers
import RulesetsContainer from '@/containers/RulesetsContainer.vue'

// Components
import List from '@/components/list/List.vue'
import RulesetListItem from '@/components/ruleset/RulesetListItem.vue'

export default {
  name: 'game-rules',
  props: ['game'],
  components: {
    RulesetsContainer, List, RulesetListItem
  }
}
</script>

<style scoped lang="scss">
  .warning{
    padding :1rem;
    background-color: white;
  }

  .button{
    margin-top: 1rem;
  }
</style>
