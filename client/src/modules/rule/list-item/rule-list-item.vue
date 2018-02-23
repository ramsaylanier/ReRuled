<template>
  <li class="rule">
    <v-touch class="link" ref="link"
      v-on:panstart="handlePanStart"
      v-on:panmove="handlePanMove"
      v-on:panend="handlePanEnd"
    >
      <router-link :to="{name: 'Game Rule', params: {id: rule.id}}">
        <span class="text">{{rule.ruleText}}</span>
      </router-link>
    </v-touch>
    <ul :class="['sub-menu', dragDirection]">
      <li class="sub-menu-item">
        <button>
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
    </ul>
  </li>
</template>

<script src="./rule-list-item.js"></script>
<style scoped lang="scss" src="./rule-list-item.scss"></style>
