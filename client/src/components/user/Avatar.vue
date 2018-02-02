<template>
  <img class="avatar" :src="src" :height="size || 100" :width="size || 100"/>
</template>

<script>
export default {
  name: 'avatar',
  props: ['src', 'size']
}
</script>

<style lang="scss" scoped>
  .avatar{
    border-radius: 50%;
  }
</style>
