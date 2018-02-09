<template>
  <div class="page">
    <game-header/>
    <nav class="game-nav">
      <ul class="game-nav-list">
        <li class="game-nav-list-item">
          <router-link to="rules">
            <svg class="icon">
              <use xlink:href="#rule-icon" />
            </svg>
          </router-link>
        </li>
        <li class="game-nav-list-item">
          <router-link to="rulesets">
            <svg class="icon">
              <use xlink:href="#ruleset-icon" />
            </svg>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="body" ref="page">
      <router-view name="page"/>
    </div>

    <modal v-if="show">
      <router-view name="rule"/>
    </modal>

    <sticky-nav/>
  </div>
</template>

<script>
import GameHeader from '@/components/header/GameHeader.vue'
import Modal from '@/components/modal/Modal.vue'
import StickyNav from '@/components/nav/StickyNav.vue'
import {TweenMax, Power4} from 'gsap'
export default {
  name: 'game',
  components: {
    GameHeader, Modal, StickyNav
  },
  data () {
    return {
      show: this.$route.name === 'Game Rule'
    }
  },
  watch: {
    '$route.name' (val) {
      this.show = val === 'Game Rule'

      if (val === 'Game Rule') {
        this.leave()
      } else {
        this.enter()
      }
    }
  },
  methods: {
    enter () {
      TweenMax.fromTo(this.$refs.page, 0.5, {
        alpha: 0,
        scale: 0.95
      }, {
        alpha: 1,
        scale: 1,
        ease: Power4.easeOut
      })
    },
    leave () {
      TweenMax.to(this.$refs.page, 0.5, {
        alpha: 0,
        scale: 0.95,
        ease: Power4.easeOut
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../styles/_colors.scss";

  .body{
    transform-origin: center center;
  }

  .page{
    padding: 3rem 0 0 0;
  }

  .page-title{
    color: $primary;
  }

  .game-nav{
    width: 100%;
    background-color: darken(white, 5%);
  }

  .game-nav-list{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .game-nav-list-item{
    flex: 1;
    text-align: center;
    a{
      display: block;
      padding: 1rem;
    }

    &:not(:last-of-type){
      border-right: 3px solid white;
    }
  }

  .icon{
    height: 20px;
    width: 20px;
    fill: $primary;
  }
  
</style>
