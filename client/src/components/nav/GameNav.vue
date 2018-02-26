<template>
  <div class="container">
    <nav class="game-nav" v-if="$route.meta.withNav">
      <ul class="game-nav-list">
        <li class="game-nav-list-item secondary">
          <router-link :to="{name: 'Game Rulesets', query: $route.query}">
            Sets
          </router-link>
        </li>
        <li class="game-nav-list-item primary">
          <router-link :to="{name: 'Game Rules', query: $route.query}">
            Rules
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="game-filter"> 
      <button>
        <svg class="icon">
          <use xlink:href="#filter-icon" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game-nav'
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";

  .container{
    display: flex;
    justify-content: space-between;
    background-color: $primary;
    position: fixed;
<<<<<<< HEAD
    width: 100%;
=======
    width: 100vw;
>>>>>>> touch-events
    z-index: 100;
  }

  .game-nav-list{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .game-nav-list-item{

    a{
      display: block;
      justify-content: center;
      align-items: center;
      padding: .75rem 1rem;
      color: white;
      text-decoration: none;
      text-transform: uppercase;
      // transition: all 300ms ease-out;
      border-bottom: 3px solid transparent;
      opacity: 0.8;
    }

    .router-link-active{
      // background-color: white;
      border-color: $secondary;
      opacity: 1;
      // color: $primary;
    }
  }

  .game-filter{
    display: flex;
    align-items: center;

    .icon{
      // fill: darken($secondary, 30%);
      fill: white;
    }
  }

  .icon{
    height: 24px;
    width: 24px;
  }
</style>
