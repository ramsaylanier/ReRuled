<template>
  <header class="header">
    <back-button :handleClick="handleClick"/>
    <span class="title">{{pageTitle}}</span>
  </header>
</template>

<script>
import BackButton from '@/components/button/BackButton.vue'
export default {
  name: 'default-header',
  components: {
    BackButton
  },
  computed: {
    pageTitle () {
      return this.$route.name
    }
  },
  methods: {
    handleClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .header{
    position: fixed;
    background-color: white;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 90;
    height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }

  .title{
    color: $primary;
    font-size: 1.1rem;
  }
</style>
