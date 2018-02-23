<template>
  <transition
    v-bind:css="false"
    v-on:leave="handleLeave"
  >
    <touch-list-item>

      <template slot="item">
        <router-link class="link" :to="{name: 'Game Rule', params: {id: rule.id}}">
          <span class="text">{{rule.ruleText}}</span>
        </router-link>
      </template>

      <template v-if="isMine" slot="menu" >
        <li class="sub-menu-item">
          <button @click="deleteRule">
            <svg class="icon">
              <use xlink:href="#delete-icon"/>
            </svg>
          </button>
        </li>
        <li class="sub-menu-item">
          <button>
            <svg class="icon">
              <use xlink:href="#add-to-ruleset-icon"/>
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

<script src="./rule-list-item.js"></script>
<style scoped lang="scss" src="./rule-list-item.scss"></style>
