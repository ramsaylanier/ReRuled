const expressJwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const jwt = require('jsonwebtoken')

const jwksOptions = {
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
}

const jwks = jwksRsa(jwksOptions)

const checkJwt = expressJwt({
  secret: jwksRsa.expressJwtSecret(jwksOptions),
  credentialsRequired: false,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: [`RS256`]
})

const validateAndParseIdToken = (idToken) => new Promise((resolve, reject) => {
  const { header, payload} = jwt.decode(idToken, {complete: true})
  if (!header || !header.kid || !payload) reject(new Error('Invalid Token'))
  jwks.getSigningKey(header.kid, (err, key) => {
    if (err) reject(new Error('Error getting signing key: ' + err.message))
    jwt.verify(idToken, key.publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) reject('jwt verify error: ' + err.message)
      resolve(decoded)
    })
  })
})

module.exports = { checkJwt, validateAndParseIdToken }