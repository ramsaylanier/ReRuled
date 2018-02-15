<template>
  <div class="wrapper" v-if="authenticated">
    <nav class="profile-nav">
      <ul class="nav-list">
        <li class="nav-list-item">
          <router-link class="profile-link" :to="{name: 'Profile'}">
              <avatar :src="me.avatar" size="50"/>
              <span class="profile-name">{{me.name}}</span>
          </router-link>
        </li>
        <li class="nav-list-item">
          <ul class="subnav-list">
            <li class="nav-list-item">
              <router-link class="nav-link" :to="{name: 'Browse'}">Browse</router-link>
            </li>
            <li class="nav-list-item"><button class="nav-button" @click="$logout()">Logout</button></li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Avatar from '@/components/user/Avatar.vue'
export default {
  name: 'app-nav',
  props: ['authenticated'],
  components: {
    Avatar
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
            avatar
            name
          }
        }
      `,
      loadingKey: 'isLoading'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_colors.scss";

  .wrapper{
    height: 100%;
    display: flex;
    flex-flow: column;
    // justify-content: space-between;
  }

  .nav-list, .subnav-list{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-list-item{
    width: 100%;
    a{
      color: $primary;
      text-decoration: none;
    }
  }

  .subnav-list{
    width: 100%;
    margin-top: 1rem;

    .nav-link, .nav-button{
      text-align: right;
      width: 100%;
      display: block;
      padding: 1rem;
      font-size: 1.1rem;
    }

    .nav-button{
      appearance: none;
      border: 0;
      color: $primary;
      background-color: transparent;
    }
  }

  .profile-link{
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    text-decoration: none;
    color: $primary;
    padding: 1rem;
    background-color: white;
  }

  .profile-name{
    margin-top: 1rem;
  }

</style>
