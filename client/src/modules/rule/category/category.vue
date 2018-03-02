<template>
  <span :class="['category', category.toLowerCase()]">{{category.substr(0, 1)}}</span>
</template>

<script>
export default {
  name: 'rule-category',
  props: ['category']
}
</script>

<style lang="scss" scoped>

@import '../../../styles/_colors.scss';

.category{
  font-size: .8rem;
  border-radius: 3px;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darken(white, 10%);
  color: white;

  &:not(:last-of-type){
    margin-bottom: .25rem;
  }

  @each $cat in map_keys($catColors) {
    &.#{$cat}{
      background-color: map-get($catColors, $cat);
    }
  }
}

</style>
