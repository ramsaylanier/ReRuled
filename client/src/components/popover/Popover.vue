<template>
  <transition
    v-bind:css="false"
    v-on:enter="enter"
    v-on:leave="leave"
    appear
  >
    <div class="popover">
      <button class="close-button" @click="handleClose">
        <svg class="icon">
          <use xlink:href="#close-icon"/>
        </svg>
      </button>
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
  name: 'popover',
  props: ['handleClose'],
  components: {
    CloseIcon
  },
  data () {
    return {
      visible: this.show
    }
  },
  methods: {
    enter (el, done) {
      TweenMax.fromTo(el, 0.3, {
        scale: 1.05
      }, {
        scale: 1,
        ease: Power4.easeOut
      })
    },
    leave (el, done) {
      TweenMax.to(el, 0.3, {
        scale: 1.05,
        opacity: 0,
        ease: Power4.easeOut,
        onComplete: done
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";
  .popover{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: fade-out(black, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
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
    fill: white;
  }

  .inner{
    width: 90%;
    max-height: 80%;
    overflow: auto;
    background-color: white;
    padding: 1rem;
  }
</style>
