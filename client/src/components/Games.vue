<template>
  <div class="page">
    <default-header/>
    <h1>Games</h1>
    {{games}}
  </div>
</template>

<script>
import gql from 'graphql-tag'
import DefaultHeader from '@/components/header/DefaultHeader.vue'

export default {
  name: 'games',
  components: {
    DefaultHeader
  },
  apollo: {
    games: gql`
      query Games{
        games{
          title
        }
      }
    `
  }
}
</script>
