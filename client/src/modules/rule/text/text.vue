<template>
  <p class="text">{{text}}</p>
</template>

<script>
export default {
  name: 'rule-text',
  props: ['text']
}
</script>

<style>
  .text{
    font-size: 1rem;
    margin: 0;
  }
</style>
