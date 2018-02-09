<template>
  <button class="button" @click="handleClick">
    <svg class="icon">
      <use xlink:href="#back-icon" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'back-button',
  props: ['handleClick']
}
</script>

<style scoped lang="scss">
  .button{
    appearance: none;
    border: 0;
    background-color: transparent;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .icon{
    height: 24px;
    width: 24px;
  }
</style>
