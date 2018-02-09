const { isLoggedIn } = require('../../utils')

const rule = {
  async createRule(parent, { ruleText, game, categories }, ctx, info) {
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

    return ctx.db.mutation.createRule(
      {
        data: {
          game: { connect: { id: game} },
          author: { connect: { id: id} },
          ruleText: ruleText,
          categories: categories
        },
      },
      info
    )
  },

  async deleteRule(parent, args, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
      throw new Error('You must be authenticated to delete a rule.')
    }

    return ctx.db.mutation.deleteRule(args)
  }
}

module.exports = { rule }
