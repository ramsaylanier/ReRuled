<template>
  <div class="page">
    <create-rule-header/>
    <div class="wrapper">
      <form class="form" @submit.prevent="handleSubmit">
        <div class="control">
          <label>Select Game</label>
          <game-select :select="handleGameSelect" :prefill="prefill"/>
        </div>

        <div class="control">
          <label>Rule Text</label>
          <textarea v-model="ruleText" rows="10" maxlength="500" required/>
        </div>

        <div class="control">
          <label>Categories</label>
          <select v-model="categories" multiple size="2">
            <option>Setup</option>
            <option>Movement</option>
            <option>Endgame</option>
            <option>Ongoing</option>
            <option>Other</option>
          </select> 
        </div>

        <div class="control">
          <form-submit value="Create Rule" :disabled="!this.gameId || this.ruleText.length === 0"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CreateRuleHeader from '@/components/header/CreateRuleHeader.vue'
import GameSelect from '@/components/form/GameSelect.vue'
import FormSubmit from '@/components/form/Submit.vue'
import gql from 'graphql-tag'

let prefill = ''

export default {
  name: 'create-rule',
  data () {
    return {
      gameId: null,
      categories: [],
      ruleText: '',
      prefill: prefill
    }
  },
  beforeRouteEnter (to, from, next) {
    prefill = to.query.game
    next()
  },
  methods: {
    handleGameSelect (game) {
      this.gameId = game.id
    },
    handleSubmit () {
      this.createRule()
    },
    createRule () {
      const gameId = this.gameId
      const ruleText = this.ruleText
      // const categories = this.categories
      this.$apollo.mutate({
        mutation: gql`
          mutation($game: String!, $categories: [String!], $ruleText: String!){
            createRule(ruleText: $ruleText, categories: $categories, game: $game){
              id
              author{
                id
              }
            }
          }
        `,
        variables: {
          game: gameId,
          ruleText,
          categories: []
        }
      }).then(r => {
        this.$router.go(-1)
      })
    }
  },
  components: {
    CreateRuleHeader, GameSelect, FormSubmit
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

    select, textarea{
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
