<template>
  <div>
    <slot :game="game"></slot>
  </div>
</template>

<script>
import GameQuery from '@/graphql/game/gameQuery.gql'
export default {
  name: 'game-container',
  props: ['gameId'],
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
          gameId: this.gameId
        }
      }
      // skip: !this.gameId
    }
  }
}
</script>

<style>

</style>
