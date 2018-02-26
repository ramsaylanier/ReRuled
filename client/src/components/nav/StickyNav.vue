<template>
  <nav :class="['menu', menuOpen ? 'is-open' : '']">
    <button class="toggle" @click="toggleMenu">
      <svg class="icon">
        <use xlink:href="#add-icon" />
      </svg>
    </button>
    <ul class="menu-list">
      <li class="menu-list-item">
        <router-link :to="{name: 'Create Rule', query: {game: game.id}}" class="link" href="">
          <span class="menu-item-text">New Rule</span>
          <svg class="icon">
            <use xlink:href="#rule-icon" />
          </svg>
        </router-link>
      </li>
      <li class="menu-list-item">
        <router-link :to="{name: 'Create Ruleset'}" class="link" href="">
          <span class="menu-item-text">New Set</span>
          <svg class="icon">
            <use xlink:href="#ruleset-icon" />
          </svg>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {TweenMax, Power4} from 'gsap'
import AddIcon from '@/components/icons/Add'
export default {
  name: 'sticky-nav',
  props: ['game'],
  components: {
    AddIcon
  },
  data () {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen
    }
  },
  watch: {
    menuOpen (isOpen) {
      if (isOpen) {
        TweenMax.staggerTo('.menu-list-item', 0.5, {
          cycle: {
            y: function (index) {
              return ((index + 1) * -65)
            }
          },
          width: 140,
          ease: Power4.easeOut
        }, 0.05)
      } else {
        TweenMax.to('.menu-list-item', 0.4, {
          y: 0,
          width: 60,
          ease: Power4.easeOut
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";
  .menu{
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    height: 60px;
    width: 60px;

    &.is-open{
      .menu-item-text{
        opacity: 1;
        display: block;
        transition: opacity 300ms ease-out 200ms;
      }

      .icon{
        opacity: 1;
        transition: opacity 300ms ease-out 200ms;
      }

      .toggle{
        transform: rotate(0deg);
      }
    }
  }

  .toggle{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 0;
    background-color: white;
    z-index: 2;
    transform: rotate(45deg);
    transition: transform 300ms ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $primary;

    &:active, &:focus{
      outline: 0;
    }

    .icon{
      height: 24px;
      width: 24px;
    }
  }

  .menu-list{
    padding: 0;
    margin: 0;
    list-style: none;
    position: relative;
  }

  .menu-list-item{
    position: absolute;
    height: 60px;
    width: 60px;
    background-color: $primary;
    top: 0px;
    right: 0px;
    z-index: 1;
    border-radius: 30px;
    padding: 0 1rem;
  }

  .link{
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    color: white;
    text-decoration: none;

    .icon{
      height: 20px;
      width: 20px;
      opacity: 0;
    }

  }

  .icon{
    transition: opacity 0ms ease-out 0ms;
    fill: white;
  }

  .menu-item-text{
    opacity: 0;
    transition: opacity 0ms ease-out 0ms;
  }
</style>
