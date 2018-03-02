// Components
import RulesetHeader from '@/modules/ruleset/ruleset-header.vue'
import ListItem from '@/components/list/list-item.vue'
import RuleCategory from '@/modules/rule/category/category.vue'
import RuleText from '@/modules/rule/text/text.vue'
import Checkbox from '@/components/form/checkbox.vue'

// Queries
import RulesetQuery from '@/graphql/ruleset/ruleset.gql'
import RulesetsCreatedQuery from '@/graphql/me/rulesetsCreated.gql'
import RulesCreatedQuery from '@/graphql/me/rulesCreated.gql'

// Mutation
import DeleteRulesetMutation from '@/graphql/ruleset/deleteRuleset.gql'
import RemoveRulesMutation from '@/graphql/ruleset/removeRulesFromRuleset.gql'

import {TweenMax, Power4} from 'gsap'

export default {
  name: 'ruleset',
  components: {
    RulesetHeader, ListItem, RuleCategory, RuleText, Checkbox
  },
  props: ['ruleset'],
  data () {
    return {
      checkedRules: new Set(),
      menuOpen: false
    }
  },
  apollo: {
    me: {
      query: RulesCreatedQuery,
      variables () {
        return {
          gameId: this.$route.params.gameId
        }
      }
    }
  },
  methods: {
    beforeEnterRuleset (el) {
      TweenMax.set(el, {
        alpha: 0,
        y: 10
      })
    },
    enterRuleset (el, done) {
      const delay = el.dataset.index / 8
      TweenMax.to(el, 0.5, {
        alpha: 1,
        y: 0,
        ease: Power4.easeOut,
        delay: delay,
        onComplete: done
      })
    },
    leaveRuleset (el, done) {
      TweenMax.to(el, 0.5, {
        alpha: 0,
        y: -10,
        ease: Power4.easeOut,
        onComplete: done
      })
    },
    enter (el, done) {
      TweenMax.fromTo(el, 0.5, {
        alpha: 0,
        rotationY: 180
      }, {
        alpha: 1,
        rotationY: 0,
        ease: Power4.easeOut,
        onComplete: done
      })
    },
    leave (el, done) {
      TweenMax.to(el, 0.5, {
        alpha: 0,
        rotationY: 180,
        ease: Power4.easeOut,
        onComplete: done
      })
    },
    handleMenuToggle () {
      this.menuOpen = !this.menuOpen
    },
    handleCheckRule (rule, isChecked) {
      if (isChecked) {
        this.checkedRules.add(rule.id)
      } else {
        this.checkedRules.delete(rule.id)
      }
    },
    handleRemoveItemsFromRuleset () {
      const rulesetId = this.ruleset.id
      this.$apollo.mutate({
        mutation: RemoveRulesMutation,
        variables: {
          rulesetId,
          ruleIds: [...this.checkedRules]
        },
        update: (store, {data: {removeRulesFromRuleset: updatedRuleset}}) => {
          const data = store.readQuery({
            query: RulesetQuery,
            variables: {id: rulesetId}
          })

          data.ruleset.rules = updatedRuleset.rules

          store.writeQuery({
            query: RulesetQuery,
            variables: {id: rulesetId},
            data
          })
        }
      })
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
