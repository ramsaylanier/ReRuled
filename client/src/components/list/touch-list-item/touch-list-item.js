import {TweenMax, Power4} from 'gsap'

const DRAG_TRIGGER = 60

export default {
  name: 'touch-list-item',
  props: ['rule'],
  data () {
    return {
      dragDirection: 'panleft'
    }
  },
  methods: {
    handlePanStart (event) {
      const dir = event.additionalEvent
      this.dragDirection = dir
    },
    handlePanMove (event) {
      const {deltaX} = event
      TweenMax.to(this.$refs.link.$el, 0.5, {
        x: deltaX,
        ease: Power4.easeOut
      })
    },
    handlePanEnd (event) {
      const OFFSET = this.$refs.menu.offsetWidth
      const dX = event.distance >= DRAG_TRIGGER ? OFFSET : 0
      const dXMod = this.dragDirection === 'panleft' ? -1 : 1
      TweenMax.to(this.$refs.link.$el, 0.5, {
        x: dX * dXMod,
        ease: Power4.easeOut
      })
    }
  }
}
