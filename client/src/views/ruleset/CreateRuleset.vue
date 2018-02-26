<template>
  <div class="page">
    <create-rule-header/>
    <div class="wrapper">
      <form class="form" @submit.prevent="handleSubmit">
        <div class="control">
          <label>Select Game</label>
          <game-select v-if="$route.query.game && !loading" :select="handleGameSelect" :game="game.title"/>
          <game-select v-else :select="handleGameSelect" :game="''"/>
        </div>

        <div class="control">
          <label>Ruleset Name</label>
          <input class="input-text" type="text" v-model="name" required/>
        </div>

        <div class="control">
          <form-submit value="Create Ruleset" :disabled="!game.id && !gameId || this.name.length === 0"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import GameQuery from '@/graphql/game/gameQuery.gql'
import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'

import CreateRulesetMutation from '@/graphql/ruleset/createRuleset.gql'

import CreateRuleHeader from '@/components/header/CreateRuleHeader.vue'
import GameSelect from '@/components/form/GameSelect.vue'
import FormSubmit from '@/components/form/Submit.vue'

export default {
  name: 'create-ruleset',
  components: {
    CreateRuleHeader, GameSelect, FormSubmit
  },
  data () {
    return {
      game: {},
      loading: 0,
      gameId: '',
      name: ''
    }
  },
  apollo: {
    game: {
      query: GameQuery,
      loadingKey: 'loading',
      variables () {
        return {
          gameId: this.$route.query.game
        }
      },
      skip () {
        return !this.$route.query.game
      }
    }
  },
  methods: {
    handleGameSelect (game) {
      this.gameId = game.id
    },
    handleSubmit () {
      this.createRule()
    },
    createRule () {
      const gameId = this.gameId || this.game.id
      const name = this.name
      this.$apollo.mutate({
        mutation: CreateRulesetMutation,
        variables: {
          game: gameId,
          name
        },
        update: (store, {data: {createRuleset}}) => {
          const prev = store.readQuery({
            query: RulesetsCreatedQuery,
            variables: {
              gameId: gameId
            }
          })

          const data = {
            ...prev,
            me: {
              ...prev.me,
              rulesets: [createRuleset, ...prev.me.rulesets]
            }
          }

          store.writeQuery({
            query: RulesetsCreatedQuery,
            variables: {
              gameId: gameId
            },
            data
          })
        }
      }).then(r => {
        this.$router.replace({
          name: 'Game Rulesets',
          params: {gameId: gameId},
          query: {me: true}
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";

  .page{
    padding: 0;
    background-image: none;
    background-color: darken(white, 5%);
  }
  .wrapper{
    margin-top: 3rem;
  }

  .form{
    margin-top: 3rem;
    padding-top: 3rem;

    label{
      display: block;
      margin-bottom: .5rem;
      text-transform: uppercase;
      color: black;
      font-weight: 600;
      font-size: .9rem;
      // margin-left: .5rem;
    }

    .input-text{
      padding: 1rem .5rem;
    }

    .input-text, select, textarea{
      font-family: 'Rubik';
      appearance: none;
      border-radius: 0;
      background-color: darken(white, 0%);
      width: 100%;
      border-width: 1px;
      border-style: solid;
      border-color: darken(white, 30%);
    }

    select{
      padding: 1rem;
    }

    option{
      padding: 1rem .5rem;
    }

    textarea{
      padding: 1rem .5rem;
    }
  }

  .control{
    padding: 0rem 1rem;

    &:not(:last-of-type){
      margin-bottom: 2rem;
    }
  }


</style>
