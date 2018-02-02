<template>
  <div class="page">
    <template :v-if="!isLoading">
      <div class="profile">
        <avatar :src="me.avatar" size="70"/>
        <h1 class="name">{{me.name}}</h1>
      </div>
    </template>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Avatar from '@/components/user/Avatar.vue'
export default {
  name: 'profile',
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
    padding: 1rem;
    display: flex;
    justify-content: center;
    // 
    background-image: $profile-gradient;
    padding: 2rem;
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
