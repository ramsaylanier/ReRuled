<template>
  <div>
    <slot :game="game"></slot>
  </div>
</template>

<script>
import GameQuery from '@/graphql/game/gameQuery.gql'
export default {
  name: 'game-container',
  data () {
    return {
      game: {}
    }
  },
  apollo: {
    game: {
      query: GameQuery,
      variables () {
        return {
          gameId: this.$route.params.gameId
        }
      }
    }
  }
}
</script>

<style>

</style>
