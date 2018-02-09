<template>
  <list-item class="rule">
    <router-link class="link" :to="{name: 'Game Rule', params: {id: rule.id}}">
      <span class="text">{{rule.ruleText}}</span>
    </router-link>
  </list-item>
</template>

<script>
import ListItem from '@/components/list/ListItem.vue'
export default {
  name: 'rule-list-item',
  components: {
    ListItem
  },
  props: ['rule']
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
