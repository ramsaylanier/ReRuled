<template>
  <button class="button" @click="handleBack"><back-icon :fill="fill"/></button>
</template>

<script>
import BackIcon from '@/components/icons/Back.vue'
export default {
  name: 'back-button',
  props: ['fill'],
  components: {
    BackIcon
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
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
</style>
