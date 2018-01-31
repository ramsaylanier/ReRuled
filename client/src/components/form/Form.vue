<template>
  <form @submit="submit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'custom-form',
  props: ['submit']
}
</script>

<style scoped lang="scss">
  @import '../../styles/_colors.scss';
  label{
    display: block;
  }

  .control{
    margin: 1rem 0;
    position: relative;

    &:after{
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-image: linear-gradient(90deg, $secondary 40%, adjust-hue($secondary, 40%) 80%);
    }
  }

  input{
    border: 0;
    padding: .5rem 1rem;
    font-size: 1rem;
    width: 100%;
  }

  input[type="submit"]{
    color: dark;
    padding: .5rem 3rem;
    font-size: 1.3rem;
    border-radius: 1px;
    display: inline-block;
    width: auto;
    margin-top: 1rem;
  }

  label{
    margin-bottom: .5rem;
    color: white;
    font-weight: 100;
  }
</style>
