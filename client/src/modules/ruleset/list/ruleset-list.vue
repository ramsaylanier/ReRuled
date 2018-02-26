<template>
  <rulesets-container>
    <ul slot-scope="data" v-if="!data.loading">
      <div class="warning" v-if="data.rulesets.length === 0">
        <p>There are no rulesets for this game</p>
        <router-link class="button --secondary" :to="{name: 'Create Ruleset', query: {game: game.id}}">Create One</router-link>
      </div>
      <ruleset-list-item 
        v-else
        v-for="ruleset in data.rulesets"
        :key="ruleset.id"
        :ruleset="ruleset"
        :isMine="isMine"
      />
    </ul>
  </rulesets-container>
</template>

<script src="./ruleset-list.js"></script>
<style src="./ruleset-list.scss" lang="scss" scoped></style>
