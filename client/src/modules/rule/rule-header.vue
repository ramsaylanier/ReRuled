<template>
  <header :class="['header', rule.categories[0].toLowerCase()]">
    <back-button :handleClick="handleClick"/>
    <span class="title">{{rule.game.title}}</span>
  </header>
</template>

<script>
import BackButton from '@/components/button/BackButton.vue'
export default {
  name: 'rule-header',
  props: ['rule'],
  components: {
    BackButton
  },
  methods: {
    handleClick () {
      this.$router.push({
        name: 'Game Rules',
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
    padding: 0 1rem;

    @each $cat in map_keys($catColors) {
      &.#{$cat}{
        background-color: map-get($catColors, $cat);
      }
    }
  }

  .button{
    fill: white;
  }

  .title{
    width: 70%;
    color: white;
    font-size: 1.1rem;
    text-align: right;
  }
</style>
