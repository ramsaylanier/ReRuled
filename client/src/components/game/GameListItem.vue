<template>
  <list-item class="game">
    <router-link class="title" :to="{name: 'Game Rules', params: {title: game.title} }">{{game.title}}</router-link>
  </list-item>
</template>

<script>
import ListItem from '@/components/list/ListItem.vue'
export default {
  name: 'game-list-item',
  components: {
    ListItem
  },
  props: ['game']
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .game{

  }

  .title{
    padding: 1rem;
    display: block;
    font-size: 1.3rem;
    color: $primary;
    text-decoration: none;
  }
</style>
