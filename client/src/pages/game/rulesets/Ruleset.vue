<template>
  <div class="rule">
    <template v-if="rule">
      <div class="rule-header">
        <p class="text">{{rule.ruleText}}</p>
      </div>

      <ul class="menu">
        <li class="menu-item"><button class="button" @click="handleDelete"><delete-icon/></button></li>
        <li class="menu-item"><button class="button"><delete-icon/></button></li>
        <li class="menu-item"><button class="button"><delete-icon/></button></li>
        <li class="menu-item"><button class="button"><delete-icon/></button></li>
      </ul>
    </template>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import DeleteIcon from '@/components/icons/Delete'
export default {
  name: 'game-rule',
  components: {
    DeleteIcon
  },
  apollo: {
    rule: {
      query: gql`
        query Rule($id: ID!){
          rule(where: {id: $id}){
            id
            ruleText
          }
        }
      `,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  },
  methods: {
    handleDelete () {
      console.log('hi')
      const confirmed = window.confirm('Do You Really Want To Delete This Rule?')

      if (confirmed) {
        this.deleteRule()
      }
    },
    deleteRule () {
      const {id, title} = this.$route.params
      const rulesQuery = gql`
        query Me($title: String!){
          me{
            rulesCreated(where: {game: {title: $title}}){
              id
              ruleText
              categories
            }
          }
        }
      `

      this.$apollo.mutate({
        mutation: gql`
          mutation DeleteRule($id: ID!){
            deleteRule(where: {id: $id}){
              id
            }
          }
        `,
        variables: {
          id: id
        },
        update: (store, {data: {deleteRule}}) => {
          const data = store.readQuery({
            query: rulesQuery,
            variables: {
              title: title
            }
          })

          const updatedRules = data.me.rulesCreated.filter(rule => {
            return rule.id !== id
          })

          data.me.rulesCreated = updatedRules

          store.writeQuery({ query: rulesQuery, variables: {title: title}, data })
        }
      }).then(r => {
        this.$router.go(-1)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../styles/_colors.scss";
  .rule{

  }

  .text{
    margin: 0;
    color: black;
    font-size: 1.2rem;
    line-height: 1.5;
  }

  .rule-header{
    padding: 1rem;
    background-color: white;
  }


  .menu{
    bottom: 0;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    border-top: 2px solid darken(white, 10%);
  }

  .menu-item{
    flex: 1;
    justify-content: center;
    text-align: center;
    background-color: white;
    // padding-bottom: 1rem;
    &:not(:last-of-type){
      border-right: 2px solid darken(white, 10%);
    }
  }

  .button{
    width: 100%;
    border: 0;
    background-color: transparent;
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
      height: 30px;
      width: 30px;
    }
  }
</style>
