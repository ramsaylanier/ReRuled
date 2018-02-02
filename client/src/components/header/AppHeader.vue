<template>
  <header class="header">
    <menu-toggle/>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'
import MenuToggle from '@/components/MenuToggle.vue'
export default {
  name: 'app-header',
  components: {
    MenuToggle
  },
  methods: {
    ...mapMutations([
      'TOGGLE_DRAWER'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .header{
    position: fixed;
    background-color: $secondary;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 90;
    height: 40px;
  }
</style>
