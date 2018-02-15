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

<script>
import ListItem from '@/components/list/ListItem.vue'
export default {
  name: 'game-list-item',
  props: ['game', 'me'],
  components: {
    ListItem
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";

  .game{
    display: flex;
    justify-content: space-between;
  }
  .title{
    padding: 1rem;
    display: block;
    font-size: 1.1rem;
    color: $primary;
    text-decoration: none;
    flex: 1;
  }

  .meta{
    display: flex;
    justify-content: flex-end;
    flex-basis: 6.5rem;
    padding: 0rem 1rem;
  }
  
  .meta-item{
    flex: 1;
    display: flex;
    align-items: center;
    &.primary{
      .icon{
        fill: $primary;
      }

      .count{
        color: $primary;
      }
    }

    &.secondary{
      .icon{
        fill: $secondary;
      }

      .count{
        color: $secondary;
      }
    }
  }

  .count{
    margin-left: .25rem;
    font-size: .9rem;
  }

  .icon{
    height: .9rem;
    width: .9rem;
    fill: white;
  }
</style>
