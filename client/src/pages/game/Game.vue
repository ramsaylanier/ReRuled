<template>
  <game-container>
    <div class="page" slot-scope="data" v-if="data.game">
      <game-header :game="data.game"/>
      <game-nav/> 
      <div class="body" ref="page">
        <router-view name="detail" :game="data.game"/>
      </div>

      <modal v-if="show"> 
        <router-view name="modal"/>
      </modal>

      <sticky-nav/>
    </div>
  </game-container>
</template>

<script>
import GameContainer from '@/containers/GameContainer.vue'
import GameHeader from '@/components/header/GameHeader.vue'
import GameNav from '@/components/nav/GameNav.vue'
import Modal from '@/components/modal/Modal.vue'
import StickyNav from '@/components/nav/StickyNav.vue'
import {TweenMax, Power4} from 'gsap'
export default {
  name: 'game',
  components: {
    GameContainer, GameHeader, GameNav, Modal, StickyNav
  },
  data () {
    return {
      show: this.$route.meta.showModal
    }
  },
  watch: {
    '$route.meta' ({showModal}) {
      this.show = showModal
      if (showModal) {
        this.leave()
      } else {
        this.enter()
      }
    }
  },
  methods: {
    enter () {
      TweenMax.fromTo(this.$refs.page, 0.5, {
        alpha: 0
      }, {
        alpha: 1,
        ease: Power4.easeOut
      })
    },
    leave () {
      TweenMax.to(this.$refs.page, 0.5, {
        alpha: 0,
        ease: Power4.easeOut
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";

  .body{
    transform-origin: center center;
    padding-top: 3rem;
  }

  .page{
    padding: 50px 0 0 0;
  }

  .page-title{
    color: $primary;
  }
</style>
