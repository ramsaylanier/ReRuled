<template>
  <div class="container">
    <input class="input" type="text" v-model="game" @keydown="handleKeyDown" placeholder="Select Game"/>
    <button class="reset" @click.prevent="handleReset"><close-icon/></button>
    <ul class="list" v-if="game.length >= 1 && showList">
      <li class="list-item" v-for="game in games" :key="game.id" @click="() => handleSelect(game)">
        {{game.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import CloseIcon from '@/components/icons/Close'
export default {
  name: 'game-select',
  props: ['select', 'prefill'],
  components: {
    CloseIcon
  },
  data () {
    return {
      game: this.prefill || '',
      skip: false,
      showList: true
    }
  },
  methods: {
    handleReset () {
      this.game = ''
      this.select(null)
    },
    handleKeyDown () {
      this.showList = true
    },
    handleSelect (game) {
      this.select(game)
      this.game = game.title
      this.showList = false
    }
  },
  apollo: {
    games: {
      query: gql`
        query Games($title: String){
          games(where: {title_contains: $title}, first: 10){
            id
            title
          }
        }
      `,
      skip () {
        return this.game.length <= 1
      },
      variables () {
        return {
          title: this.game
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";

  .container{
    position: relative;
  }

  .input{
    width: 100%;
    height: 50px;
    border: 0;
    padding: 1rem .5rem;
    margin-bottom: 3px;
    border-radius: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: darken(white, 30%);
    background-color: darken(white, 0%);
    font-family: 'Rubik';
    padding-right: 3rem;
  }

  .reset{
    position: absolute;
    top: 0px;
    right: 0px;
    height: 50px;
    border: 1px solid darken(white, 30%);
    background-color: darken(white, 5%);
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
      height: 20px;
      width: 20px;
    }
  }

  .list{
    list-style: none;
    text-align: left;
    background-color: white;
    margin: 0;
    padding: 0;
    max-height: 300px;
    overflow: auto;
    // position: absolu
    width: 100%;
  }

  .list-item{
    padding: 1rem .5rem;
    text-align: left;
    background-color: darken(white, 0%);
    color: black;
    font-weight: 500;
    &:not(:last-of-type){
      border-bottom: 1px solid darken(white, 30%);
    }
  }
</style>
