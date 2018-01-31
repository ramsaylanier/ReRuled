<template>
  <div class="hello">
    <h1>Games</h1>
    {{games}}
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'games',
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
