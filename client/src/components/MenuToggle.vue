<template>
  <button 
    :class="['button', drawer.isOpen ? 'isOpen' : '']"
    :aria-expanded="drawer.isOpen || false"
    @click.prevent="toggleDrawer"
  >
    <span class="bar bar-1"></span>
    <span class="bar bar-2"></span>
    <span class="bar bar-3"></span>
  </button>
</template>

<script>
import DrawerQuery from '@/graphql/client/drawer.gql'
import ToggleDrawerMutation from '@/graphql/client/toggleDrawer.gql'
export default {
  name: 'menu-toggle',
  apollo: {
    drawer: DrawerQuery
  },
  methods: {
    toggleDrawer () {
      this.$apollo.mutate({
        mutation: ToggleDrawerMutation
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .button{
    position: fixed;
    top: .5rem;
    right: 300vw;
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
    pointer-events: none; 
    display: block;
    background: white;
    height: 2px;
    width: 30px;
  }
</style>
