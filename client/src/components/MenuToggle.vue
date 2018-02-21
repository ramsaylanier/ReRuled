<template>
  <button 
    :class="['button', drawer.isOpen ? 'isOpen' : '']"
    :aria-expanded="drawer.isOpen || false"
    @click.prevent="toggleDrawer"
  >
    <svg class="icon">
      <use xlink:href="#menu-icon"/>
    </svg>
  </button>
</template>

<script>
import DrawerQuery from '@/graphql/client/drawer.gql'
import ToggleDrawerMutation from '@/graphql/client/toggleDrawer.gql'
export default {
  name: 'menu-toggle',
  data () {
    return {
      drawer: {}
    }
  },
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
    right: 266vw;
    padding: 0;
    border: 0;
    background-color: transparent;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: top;
    height: 30px;
    transition: opacity 150ms ease-out;

    &.isOpen{
      opacity: 0;
      pointer-events: none;
    }

    svg{
      fill: white;
      pointer-events: none;
    }
  }
</style>
