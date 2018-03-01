<template>
  <transition
    v-bind:css="false"
    v-on:leave="handleLeave"
  >
    <touch-list-item>

      <template slot="item">
        <router-link class="link" :to="{name: 'Ruleset', params: {rulesetId: ruleset.id}}">
          <span class="text">{{ruleset.name}}</span>
        </router-link>
      </template>

      <template v-if="isMine" slot="menu" >
        <li class="sub-menu-item">
          <button @click="deleteRuleset">
            <svg class="icon">
              <use xlink:href="#delete-icon"/>
            </svg>
          </button>
        </li>
      </template>

      <template v-else slot="menu" >
        <li class="sub-menu-item">
          <button>
            <svg class="icon">
              <use xlink:href="#copy-icon"/>
            </svg>
          </button>
        </li>
      </template>
    </touch-list-item>
  </transition>
</template>

<script src="./ruleset-list-item.js"></script>
<style scoped lang="scss" src="./ruleset-list-item.scss"></style>
