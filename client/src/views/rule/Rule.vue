<template>
  <div class="rule">
    <template v-if="rule">
      <div class="rule-header">
        <p class="text">{{rule.ruleText}}</p>
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
      </ul>

      <ruleset-list :rulesets="rule.rulesets"/>
    </template>

    <popover v-if="showPopover" :handleClose="() => showPopover = false">
      <ul v-if="me.rulesetsCreated.length > 0">
        <li v-for="ruleset in me.rulesetsCreated" :key="ruleset.id" @click="() => handleAddToRuleset(ruleset)">
          {{ruleset.name}}
        </li>
      </ul>

      <div v-else>
        <p>You don't have any ruleset created for this game.</p>
        <router-link :to="{name: 'Create Ruleset'}">Create One</router-link>
      </div>
    </popover>
  </div>
</template>

<script>
// Components
import Popover from '@/components/popover/Popover'
import RulesetList from '@/components/ruleset/RulesetList'

// Queries
import RuleQuery from '@/graphql/rule/rule.gql'
import RulesCreatedQuery from '@/graphql/me/rulesCreated.gql'
import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'

// Mutations
import DeleteRuleMutation from '@/graphql/rule/deleteRule.gql'
import AddRuleMutation from '@/graphql/ruleset/addRuleToRuleset.gql'

export default {
  name: 'game-rule',
  components: {
    Popover, RulesetList
  },
  data () {
    return {
      showPopover: false
    }
  },
  apollo: {
    rule: {
      query: RuleQuery,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    },
    me: {
      query: RulesetsCreatedQuery,
      variables () {
        return {
          gameId: this.$route.params.gameId
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
        mutation: AddRuleMutation,
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
      const rulesQuery = RulesCreatedQuery

      this.$apollo.mutate({
        mutation: DeleteRuleMutation,
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
  @import "../../styles/_colors.scss";
  .text{
    margin: 0;
    color: black;
    font-size: 1.3rem;
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

  .ruleset-list{
    margin: 2rem 0 0 0;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

    li{
      &:not(:last-of-type){
        margin-bottom: .5rem;
      }
    }

    a{
      font-size: .8rem;
      display: inline-block;
      padding: .5rem 1rem;
      background: $primary;
      color: white;
      border-radius: 3px;
      text-decoration: none;
    }
  }

  .list{
    margin-top: 1rem;
  }
</style>
