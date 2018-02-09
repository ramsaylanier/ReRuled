<template>
  <div class="page">
    <profile-header/>
    <template :v-if="!isLoading">
      <div class="profile">
        <avatar :src="me.avatar" size="70"/>
        <h1 class="name">{{me.name}}</h1>
      </div>
      <div class="body">
        <list>
          <game-list-item v-for="game in me.gamesOwned" :key="game.id" :game="game"/>
        </list> 
      </div>     

    </template>
    <sticky-nav/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ProfileHeader from '@/components/header/ProfileHeader.vue'
import Avatar from '@/components/user/Avatar.vue'
import StickyNav from '@/components/nav/StickyNav.vue'
import List from '@/components/list/List.vue'
import GameListItem from '@/components/game/GameListItem.vue'
import AddIcon from '@/components/icons/Add.vue'
export default {
  name: 'profile',
  components: {
    ProfileHeader, Avatar, List, GameListItem, AddIcon, StickyNav
  },
  data () {
    return {
      me: {},
      isLoading: 0
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
            gamesOwned{
              id
              title
            }
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
</style>
