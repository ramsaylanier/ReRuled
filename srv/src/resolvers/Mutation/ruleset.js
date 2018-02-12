const { isLoggedIn } = require('../../utils')

const ruleset = {
  async createRuleset(parent, { name, game }, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
      throw new Error('You must be authenticated to create a game.')
    }

    const user = await ctx.db.mutation.updateUser(
      {
        data: {
          gamesOwned: { connect: {id: game}}
        },
        where: {id: id} 
      }
    )

    return ctx.db.mutation.createRuleset(
      {
        data: {
          game: { connect: { id: game} },
          author: { connect: { id: id} },
          name: name,
        },
      },
      info
    )
  },

  async deleteRuleset(parent, args, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
      throw new Error('You must be authenticated to delete a rule.')
    }

    return ctx.db.mutation.deleteRuleset(args)
  },

  async addRuleToRuleset(parent, {ruleId, rulesetId}, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
      throw new Error('You must be authenticated to delete a rule.')
    }

    return ctx.db.mutation.updateRuleset({
      where: {id: rulesetId},
      data: {
        rules: {
          connect: {
            id: ruleId
          }
        }
      }
    })
  }
}

module.exports = { ruleset }
