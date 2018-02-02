const { isLoggedIn } = require('../../utils')

const game = {
  async createGame(parent, { title }, ctx, info) {
    const {id} = isLoggedIn(ctx)
    if (!id) {
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
