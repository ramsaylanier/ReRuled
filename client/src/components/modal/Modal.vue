<template>
  <transition
    v-bind:css="false"
    v-on:enter="enter"
    v-on:leave="leave"
    appear
  >
    <div class="modal">
      <button class="close-button" @click="handleClose"><close-icon fill="white"/></button>
      <div class="inner">
        <slot></slot>
      </div>
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
      TweenMax.fromTo(el, 0.5, {
        alpha: 0,
        scale: 1.05
      }, {
        alpha: 1,
        scale: 1,
        ease: Power4.easeOut
      })
    },
    leave (el, done) {
      TweenMax.to(el, 0.5, {
        alpha: 0,
        scale: 1.05,
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
    background-color: fade-out(black, .1);
    transform-origin: center center;
    padding: 1rem;
    z-index: 101;
  }

  .inner{
    padding-top: 3rem;
  }

  .close-button{
    appearance: none;
    border: 0;
    background-color: transparent;
    position: absolute;
    top: .5rem;
    right: .5rem;

    svg{
      height: 30px;
      width: 30px;
    }
  }
</style>
