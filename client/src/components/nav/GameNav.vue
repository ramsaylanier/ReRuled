<template>
  <nav class="game-nav" v-if="$route.meta.withNav">
    <ul class="game-nav-list">
      <li class="game-nav-list-item primary">
        <router-link :to="{name: 'Game Rules', query: $route.query}">
          <svg class="icon">
            <use xlink:href="#rule-icon" />
          </svg>
        </router-link>
      </li>
      <li class="game-nav-list-item secondary">
        <router-link :to="{name: 'Game Rulesets', query: $route.query}">
          <svg class="icon">
            <use xlink:href="#ruleset-icon" />
          </svg>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'game-nav'
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";
  .game-nav{
    width: 100%;
    background-color: darken(white, 5%);
  }

  .game-nav-list{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .game-nav-list-item{
    flex: 1;
    text-align: center;
    a{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .7rem;
    }

    &.primary{
      a{
        &.router-link-active{
          background-color: darken($primary, 5%);

          .icon{
            fill: white;
          }
        }
      }

      .icon{
        fill: $primary;
      }
    }

    &.secondary{
      a{
        &.router-link-active{
          background-color: darken($secondary, 5%);

          .icon{
            fill: white;
          }
        }
      }

      .icon{
        fill: $secondary;
      }
    }

    &:not(:last-of-type){
      border-right: 3px solid white;
    }
  }

  .icon{
    height: 20px;
    width: 20px;
  }
</style>
