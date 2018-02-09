<template>
  <input type="submit" :value="value" :disabled="disabled"/>
</template>

<script>
export default {
  name: 'form-submit',
  props: ['value', 'disabled']
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";

  input{
    appearance: none;
    border: 0;
    padding: 1.5rem 2.5rem;
    border-radius: 5px;
    font-size: 1.3rem;
    color: white;
    width: 100%;
    box-shadow: 0px 10px 10px -5px darken($secondary, 20%);
    font-family: 'Rubik';
    background-image: $submit-gradient;

    &:disabled{
      opacity: 0.2;
    }
  }
</style>
