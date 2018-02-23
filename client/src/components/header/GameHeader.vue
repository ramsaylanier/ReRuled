<template>
  <header class="header">
    <back-button :handleClick="handleClick"/>
    <span class="title">{{game.title}}</span>
  </header>
</template>

<script>
import BackButton from '@/components/button/BackButton.vue'
export default {
  name: 'game-header',
  props: ['game'],
  components: {
    BackButton
  },
  methods: {
    handleClick () {
      this.$router.push('/profile')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .header{
    position: fixed;
    background-color: $primary;
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
