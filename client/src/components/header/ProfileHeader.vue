<template>
  <header class="header">

  </header>
</template>

<script>
export default {
  name: 'profile-header'
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .header{
    position: fixed;
    background-color: $primary;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 90;
    height: 40px;
  }
</style>
