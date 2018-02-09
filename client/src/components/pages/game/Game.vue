<template>
  <div class="page">
    <game-header/>
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
  
</style>
