<template>
  <ul class="list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'custom-list'
}
</script>

<style scoped lang="scss">
  .list{
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
