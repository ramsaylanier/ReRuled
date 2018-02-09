<template>
  <li class="list-item">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'list-item'
}
</script>

<style scoped lang="scss">
  .list-item{
    background-color: white;
    border-bottom: 5px solid darken(white, 10%);
  } 
</style>
