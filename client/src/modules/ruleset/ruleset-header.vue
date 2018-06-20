<template>
  <header :class="['header', menuOpen ? '--open' : '']">
    <template v-if="!menuOpen">
      <back-button :handleClick="handleBackClick"/>
      <span class="title">{{truncate(ruleset.game.title, 35)}}</span>
      <button class="menu-toggle" @click="handleToggleClick">
        <svg class="icon">
          <use xlink:href="#dots-icon"/>
        </svg>
      </button>
    </template>

    <template v-else>
      <button class="menu-toggle" @click="handleToggleClick">
        <svg class="icon">
          <use xlink:href="#back-icon"/>
        </svg>
      </button>
      <button class="menu-toggle" @click="handleRemoveClick">
        <svg class="icon">
          <use xlink:href="#remove-from-ruleset-icon"/>
        </svg>
      </button>
    </template>
  </header>
</template>

<script>
import BackButton from '@/components/button/BackButton.vue'
import {truncate} from '@/utils.js'
export default {
  name: 'ruleset-header',
  props: ['ruleset', 'onMenuToggle', 'menuOpen', 'onRemove'],
  components: {
    BackButton
  },
  methods: {
    truncate,
    handleToggleClick () {
      this.onMenuToggle()
    },
    handleRemoveClick () {
      this.onRemove()
    },
    handleBackClick () {
      this.$router.push({
        name: 'Game Rulesets',
        gameId: this.$route.params.gameId,
        query: this.$route.query
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 90;
    height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $primary;
    padding: 0 .5rem;
    transition: background 300ms ease-out;

    &.--open{
      background-color: $secondary;
    }
  }

  .button{
    fill: white;
    flex-basis: 30px;
  }

  .title{
    flex: 1;
    color: white;
    font-size: .9rem;
    text-align: center;
    padding: 0 .5rem;
  }

  .menu-toggle{
    display: flex;
    align-items: center;
    flex-basis: 24px;
    border: 0;
    background: transparent;
    padding: 0;

    &:focus{
      outline: none;
    }

    .icon{
      height: 24px;
      width: 24px;
      fill: white;      
    } 
  }

</style>
