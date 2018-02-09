<template>
  <list-item class="ruleset">
    <router-link class="link" :to="{name: 'Game Ruleset', params: {id: ruleset.id}}">
      <span class="text">{{ruleset.name}}</span>
    </router-link>
  </list-item>
</template>

<script>
import ListItem from '@/components/list/ListItem.vue'
export default {
  name: 'ruleset-list-item',
  components: {
    ListItem
  },
  props: ['ruleset']
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .link{
    padding: 1rem;
    display: block;
    text-decoration: none;
    font-size: 1.1rem;
    color: $secondary;
  }
</style>
