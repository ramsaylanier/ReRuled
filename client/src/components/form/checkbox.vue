<template>
  <div class="container">
    <input type="checkbox" hidden :checked="isChecked"/>
    <button :class="[isChecked ? 'checked' : '']" @click="handleCheck">
      <svg class="icon">
        <use v-if="isChecked" xlink:href="#checkbox-checked-icon"/>
        <use v-else xlink:href="#checkbox-icon" />
      </svg>
    </button> 
  </div>
</template>

<script>
export default {
  name: 'checkbox',
  props: ['onCheck'],
  data () {
    return {
      isChecked: false
    }
  },
  methods: {
    handleCheck () {
      this.isChecked = !this.isChecked
      this.onCheck(this.isChecked)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";
  .container{
    button{
      border: 0;
      padding: 0;
      background-color: transparent;

      &:focus{
        outline: none;
      }

      &.checked{
        fill: $secondary;
      }
    }

    .icon{
      height: 32px;
      width: 32px;
      transition: fill 150ms ease-out;
    }
  }
</style>
