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

<script src="./rule-list.js"></script>
<style scoped lang="scss" src="./rule-list.scss">