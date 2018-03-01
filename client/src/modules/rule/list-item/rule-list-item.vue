<template>
  <transition
    v-bind:css="false"
    v-on:leave="handleLeave"
  >
    <touch-list-item>
      <template slot="item">
        <router-link class="link" :to="{
          name: 'Rule',
          params: {ruleId: rule.id},
          query: $route.query
        }">
          <span class="text">{{truncate(rule.ruleText, 150)}}</span>
          
          <div class="categories">
            <span :class="['category', cat.toLowerCase()]" v-for="cat in rule.categories" :key="cat">{{cat.substr(0, 1)}}</span>
          </div>
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
          <router-link :to="{
            name: 'Add Rule to Rulesets',
            params: {
              id: rule.id  
            }
          }">
            <svg class="icon">
              <use xlink:href="#add-to-ruleset-icon"/>
            </svg>
          </router-link>
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
