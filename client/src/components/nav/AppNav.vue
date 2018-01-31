<template>
  <nav>
    <ul> 
      <template v-if="authenticated">
        <li><button @click="$logout()">Logout</button></li>
      </template>
      <template v-else>
        <li><button @click="$login()">Login</button></li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'app-nav',
  props: ['authenticated']
}
</script>

<style>

</style>
