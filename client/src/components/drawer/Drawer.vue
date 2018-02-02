<template>
  <div :class="['drawer', drawerIsOpen ? 'isOpen' : '']" @click="handleDrawerClick">
    <div class="overlay"></div>
    <div class="inner" ref="inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {TweenMax, Power4} from 'gsap'
export default {
  name: 'drawer',
  computed: {
    ...mapGetters([
      'drawerIsOpen'
    ])
  },
  methods: {
    ...mapActions(['toggleDrawer']),
    animateDrawerIn () {
      TweenMax.set(this.$el, {x: -this.$el.offsetWidth})
      TweenMax.to(this.$refs.inner, 0.35, {
        x: -this.$el.offsetWidth + 2,
        ease: Power4.easeOut
      })
    },
    animateDrawerOut () {
      TweenMax.to(this.$refs.inner, 0.35, {
        x: 0,
        ease: Power4.easeOut,
        onComplete: () => {
          TweenMax.set(this.$el, {x: window.innerWidth})
        }
      })
    },
    handleDrawerClick (e) {
      if (this.drawerIsOpen) {
        this.toggleDrawer()
      }
    }
  },
  watch: {
    drawerIsOpen (isOpen) {
      isOpen ? this.animateDrawerIn() : this.animateDrawerOut()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .drawer{
    position: fixed;
    top: 0;
    left: 100vw;
    width: 100%;
    height: 100%;
    z-index: 100;

    &.isOpen{
      .overlay{
        opacity: 1;
      }
    }

    .overlay{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      background-color: fade-out(black, 0.5);
      transition: opacity 300ms ease-out;
    }

    .inner{
      position: absolute;
      top: 0;
      left: 130vw;
      width: 70vw;
      height: 100%;
      // border-left: 3px solid white;
      background-color: darken(white, 5%);
    }
  }
</style>
