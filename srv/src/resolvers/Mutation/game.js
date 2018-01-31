const { getUserId, Context } = require('../../utils')

const game = {
  async createGame(parent, { title }, ctx, info) {
    const userId = getUserId(ctx)
    if (!userId) {
      throw new Error('You must be authenticated to create a game.')
    }
    return ctx.db.mutation.createGame(
      {
        data: {
          title
        },
      },
      info
    )
  }
}

module.exports = { game }
