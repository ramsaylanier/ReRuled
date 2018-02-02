<template>
  <div class="page">
    <template :v-if="!isLoading">
      <div class="profile">
        <avatar :src="me.avatar" size="70"/>
        <h1 class="name">{{me.name}}</h1>
      </div>
      <div class="body">

      </div>

      <nav :class="['menu', menuOpen ? 'is-open' : '']">
        <button class="toggle" @click="toggleMenu">+</button>
        <router-link :to="{name: 'Games'}" class="menu-item" href="">
          <span class="menu-item-text">New Rule</span>
        </router-link>
        <router-link :to="{name: 'Games'}" class="menu-item" href="">
          <span class="menu-item-text">New Set</span>
        </router-link>
      </nav>
    </template>

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="shadowed-goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="6" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="1" result="shadow" />
            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
            <feOffset in="shadow" dx="0" dy="0" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Avatar from '@/components/user/Avatar.vue'
import {TweenMax, Power4} from 'gsap'
export default {
  name: 'profile',
  components: {
    Avatar
  },
  data () {
    return {
      me: {},
      menuOpen: false,
      isLoading: 0
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
        TweenMax.staggerTo('.menu-item', 0.5, {
          cycle: {
            y: function (index) {
              return ((index + 1) * -75)
            }
          },
          x: -100,
          width: 150,
          height: 50,
          ease: Power4.easeOut
        }, 0)
      } else {
        TweenMax.to('.menu-item', 0.4, {
          y: 0,
          x: 0,
          width: 30,
          height: 30,
          ease: Power4.easeOut
        })
      }
    }
  },
  apollo: {
    me: {
      query: gql`
        query Me{
          me{
            name
            avatar
            email
          }
        }
      `,
      loadingKey: 'isLoading'
    }
  }
}
</script> 

<style lang="scss" scoped>
  @import "../../../styles/_colors.scss";

  .page{
    padding: 0;
    padding-top: 40px;
  }

  .profile{
    align-items: center;
    padding: 0rem 1rem 2rem 1rem;
    display: flex;
    justify-content: center;
    // 
    background-image: $profile-gradient;
    border-bottom: 3px solid white;
  }

  .name{
    margin: 0;
    font-size: 1.3rem;
    color: white;
    font-weight: 100;
  }

  .avatar{
    margin-right: 1rem;
  }

  .menu{
    filter: url('#shadowed-goo');
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    height: 70px;
    width: 70px;

    &.is-open{
      .menu-item-text{
        opacity: 1;
        display: block;
        transition: opacity 300ms ease-out 200ms;
      }

      .toggle{
        transform: rotate(45deg);
      }
    }
  }

  .menu-item{
    position: absolute;
    height: 30px;
    width: 30px;
    background-color: white;
    top: 0px;
    left: 10px;
    z-index: 1;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: $primary;
    font-size: 1.2rem;
  }

  .menu-item-text{
    opacity: 0;
    transition: opacity 0ms ease-out 0ms;
  }

  .toggle{
    position: absolute;
    height: 60px;
    width: 60px;
    top: 0;
    left: 0;
    border-radius: 50%;
    border: 0;
    background-color: white;
    font-size: 2rem;
    z-index: 2;
    color: $primary;
    transition: transform 300ms ease-out;
  }
</style>
