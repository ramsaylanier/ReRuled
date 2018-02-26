<template>
  <div class="ruleset">
    <template v-if="ruleset">
      <div class="rule-header">
        <p class="text">{{ruleset.name}}</p>
      </div>

      <ul class="menu">
        <li class="menu-item">
          <button class="button" @click="handleDelete">
            <svg class="icon">
              <use xlink:href="#delete-icon"/>
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

      <div class="rules">
        <rule-list :rules="ruleset.rules"/>
      </div>
    </template>

    <popover v-if="showPopover" :handleClose="() => showPopover = false">
      <ul v-if="me.rulesCreated.length > 0">
        <li v-for="rule in me.rulesCreated" :key="rule.id" @click="() => handleAddToRuleset(rule)">
          {{rule.ruleText}}
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

// Queries
import RulesetQuery from '@/graphql/ruleset/ruleset.gql'
import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'
import RulesCreatedQuery from '@/graphql/me/rulesCreated.gql'

// Mutation
import DeleteRulesetMutation from '@/graphql/ruleset/deleteRuleset.gql'

export default {
  name: 'game-ruleset',
  components: {
    Popover
  },
  data () {
    return {
      showPopover: false
    }
  },
  apollo: {
    ruleset: {
      query: RulesetQuery,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    },
    me: {
      query: RulesCreatedQuery,
      variables () {
        console.log(this.$route.params.title)
        return {
          title: this.$route.params.title
        }
      }
    }
  },
  methods: {
    togglePopover () {
      this.showPopover = !this.showPopover
    },
    handleDelete () {
      const confirmed = window.confirm('Do You Really Want To Delete This Ruleset?')

      if (confirmed) {
        this.deleteRuleset()
      }
    },
    deleteRuleset () {
      const {id, title} = this.$route.params

      this.$apollo.mutate({
        mutation: DeleteRulesetMutation,
        variables: {
          id: id
        },
        update: (store, {data: {deleteRule}}) => {
          const data = store.readQuery({
            query: RulesetsCreatedQuery,
            variables: {
              game: title
            }
          })

          const updatedRulesets = data.me.rulesetsCreated.filter(ruleset => {
            return ruleset.id !== id
          })

          data.me.rulesetsCreated = updatedRulesets

          store.writeQuery({ query: RulesetsCreatedQuery, variables: {game: title}, data })
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

  .rules{
    margin-top: 1rem;
  }
</style>
