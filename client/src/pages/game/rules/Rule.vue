<template>
  <div class="rule">
    <template v-if="rule">
      <div class="rule-header">
        <p class="text">{{rule.ruleText}}</p>

        <list>
          In: 
          <li v-for="ruleset in rule.rulesets" :key="ruleset.id">
            {{ruleset.name}}
          </li>
        </list>
      </div>

      <ul class="menu">
        <li class="menu-item">
          <button class="button" @click="handleDelete">
            <svg class="icon">
              <use xlink:href="#delete-icon" />
            </svg>
          </button>
        </li>
        <li class="menu-item">
          <button class="button" @click="togglePopover">
            <svg class="icon">
              <use xlink:href="#add-to-ruleset-icon" />
            </svg>
          </button>
        </li>
        <li class="menu-item">
          <button class="button" @click="togglePopover">
            <svg class="icon">
              <use xlink:href="#remove-from-ruleset-icon" />
            </svg>
          </button>
        </li>
      </ul>
    </template>


    <popover v-if="showPopover" :handleClose="() => showPopover = false">
      <ul>
        <li v-for="ruleset in me.rulesetsCreated" :key="ruleset.id" @click="() => handleAddToRuleset(ruleset)">
          {{ruleset.name}}
        </li>
      </ul>
    </popover>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Popover from '@/components/popover/Popover'
import List from '@/components/list/List'
export default {
  name: 'game-rule',
  components: {
    Popover, List
  },
  data () {
    return {
      showPopover: false
    }
  },
  apollo: {
    rule: {
      query: gql`
        query Rule($id: ID!){
          rule(where: {id: $id}){
            id
            ruleText
            rulesets{
              name
            }
          }
        }
      `,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    },
    me: {
      query: gql`
        query Rulesets($game: String!){
          me{
            rulesetsCreated(where: {game: {title: $game}}){
              id
              name
            }
          }
        }
      `,
      variables () {
        return {
          game: this.$route.params.title
        }
      }
    }
  },
  methods: {
    togglePopover () {
      this.showPopover = !this.showPopover
    },
    handleDelete () {
      const confirmed = window.confirm('Do You Really Want To Delete This Rule?')

      if (confirmed) {
        this.deleteRule()
      }
    },
    handleAddToRuleset (ruleset) {
      const rulesetId = ruleset.id
      const ruleId = this.rule.id

      this.$apollo.mutate({
        mutation: gql`
          mutation AddRuleToRuleset($rulesetId: ID!, $ruleId: ID!){
            addRuleToRuleset(rulesetId: $rulesetId, ruleId: $ruleId){
              id
            }
          }
        `,
        variables: {
          rulesetId: rulesetId,
          ruleId: ruleId
        }
      }).then(r => {
        this.showPopover = false
      })
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
  .text{
    margin: 0;
    color: black;
    font-size: 1.1rem;
    line-height: 1.3;
  }

  .rule-header{
    padding: 3rem 1rem 2rem 1rem;
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
      height: 24px;
      width: 24px;
    }
  }
</style>
