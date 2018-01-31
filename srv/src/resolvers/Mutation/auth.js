const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Context } = require( '../../utils')
const validateAndParseIdToken = require('../../helpers/validateAndParseIdToken')

async function createPrismaUser(ctx, idToken) {
  console.log(idToken)
  const user = await ctx.db.mutation.createUser({
    data: {
      identity: idToken.sub.split(`|`)[0],
      auth0id: idToken.sub.split(`|`)[1],
      name: idToken.name,
      email: idToken.email,
      avatar: idToken.picture
    },
  })
  return user
}

const auth = {
  async authenticate(parent, { idToken }, ctx, info) {
    let userToken = null
    try {
      userToken = await validateAndParseIdToken(idToken)
    }
    catch (err) {
      throw new Error(err.message)
    }
    const auth0id = userToken.sub.split('|')[1]
    let user = await ctx.db.query.user({where: { auth0id }}, info)
    if (!user) {
      user = createPrismaUser(ctx, userToken)
    }
    return user
},
}

module.exports = { auth }
