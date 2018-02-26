<template>
  <list-item class="game">
    <router-link class="title" :to="{name: 'Game Rulesets', params: {gameId: game.id}, query: {me: me} }">{{game.title}}</router-link>
    <div class="meta">
      <div class="meta-item primary">
        <svg class="icon">
          <use xlink:href="#rule-icon"/>
        </svg>
        <span class="count">{{game.ruleCount}}</span>
      </div>
      <div class="meta-item secondary">
        <svg class="icon">
          <use xlink:href="#ruleset-icon"/>
        </svg>
        <span class="count">{{game.rulesetCount}}</span>
      </div>
    </div>
  </list-item>
</template>

<script src="./game-list-item.js"></script>
<style src="./game-list-item.scss" lang="scss" scoped></style>