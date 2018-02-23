<template>
  <div id="app">
    <icons/>
    <drawer>
      <router-view name="drawerContent" :authenticated="authenticated"/>
    </drawer>
    <router-view name="page"/>

  </div>
</template>

<script>
import Drawer from '@/components/drawer/Drawer.vue'
import Icons from '@/components/icons/Icons.vue'
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
    Drawer, Icons
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
    overflow: auto;
  }

  *{
    box-sizing: border-box;
  }
</style>