<template>
  <div id="app">
    <router-view name="header"/>
    <router-view name="page"/>

    <drawer>
      <router-view name="drawerNav" :authenticated="authenticated"/>
    </drawer>
  </div>
</template>

<script>
import Drawer from '@/components/drawer/Drawer.vue'
export default {
  name: 'app',
  data () {
    this.$auth.authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      authenticated: this.$auth.authenticated
    }
  },
  components: {
    Drawer
  }
}
</script>

<style lang="scss">
  @import "./styles/normalize";
  @import "./styles/base";
  @import url('https://fonts.googleapis.com/css?family=Rubik:400,700');

  #app {
    font-family: 'Rubik', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *{
    box-sizing: border-box;
  }
</style>