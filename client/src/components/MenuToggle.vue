<template>
  <a :class="['button', drawerIsOpen ? 'isOpen' : '']" @click="handleClick">
    <span class="bar bar-1"></span>
    <span class="bar bar-2"></span>
    <span class="bar bar-3"></span>
  </a>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'menu-toggle',
  computed: {
    ...mapGetters(['drawerIsOpen'])
  },
  methods: {
    ...mapActions(['toggleDrawer']),
    handleClick: function (e) {
      this.toggleDrawer()
    }
  }
}
</script>

<style lang="scss" scoped>
  .button{
    position: absolute;
    top: .5rem;
    right: .5rem;
    border: 0;
    background-color: transparent;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: top;
    height: 23px;
    transition: opacity 150ms ease-out;

    &.isOpen{
      opacity: 0;
      pointer-events: none;
    }
  }

  .bar{
    display: block;
    background: white;
    height: 2px;
    width: 30px;
  }
</style>
