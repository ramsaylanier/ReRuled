<template>
  <div class="page">
    <header>
      <div class="logo js-animateable">
        <full-logo/>
      </div>
    </header>

    <div class="body">
      <button class="button js-animateable" @click="$login()">Login Or Register</button>
    </div>
  </div>
</template>

<script>
import FullLogo from '@/components/icons/FullLogo.vue'
export default {
  name: 'Home',
  components: {
    FullLogo
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/_colors.scss";

  .page{
    // background: white;
    padding: 0;
    display: flex;
    flex-flow: column;
  }

  header{
    background-color: white;
    padding: 1rem;
  }

  .logo{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
      width: 200px;
      height: 200px;
    }
  }

  .body{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
  }

  .button{
    padding: 1rem 3rem;
    border-radius: 2px;
    appearance: none;
    color: $primary;
    background-color: white;
    border: 0;
    box-shadow: 10px 10px 20px 0px darken($primary, 20%);
  }
</style>
