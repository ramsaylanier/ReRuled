<template>
  <transition
    v-bind:css="false"
    v-on:enter="enter"
    v-on:leave="leave"
    appear
  >
    <div class="modal">
      <button class="close-button" @click="handleClose">
        <svg class="icon">
          <use xlink:href="#close-icon"/>
        </svg>
      </button>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import {TweenMax, Power4} from 'gsap'
import CloseIcon from '@/components/icons/Close.vue'
export default {
  name: 'modal',
  components: {
    CloseIcon
  },
  methods: {
    enter (el, done) {
      TweenMax.fromTo(el, 0.3, {
        x: window.innerWidth
      }, {
        x: 0,
        ease: Power4.easeOut
      })
    },
    leave (el, done) {
      TweenMax.to(el, 0.3, {
        x: window.innerWidth,
        ease: Power4.easeOut,
        onComplete: done
      })
    },
    handleClose () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";
  .modal{
    position: fixed;
    top: 0px;
    height: 100%;
    width: 100%;
    background-color: darken(white, 10%);
    transform-origin: center center;
    z-index: 101;
    overflow: auto;
  }

  .close-button{
    appearance: none;
    border: 0;
    background-color: transparent;
    position: absolute;
    top: .5rem;
    right: .5rem;
  }

  .icon{
    height: 30px;
    width: 30px;
    fill: $primary;
  }
</style>
