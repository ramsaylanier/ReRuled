const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')
const { checkJwt } = require('./middleware/jwt')
const { getUser } = require('./middleware/getUser')
const cors = require('cors')

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
  secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
  debug: true, // log all GraphQL queries & mutations
})


const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db
  }),
})

server.express.use(cors())
server.express.post(server.options.endpoint, checkJwt,  (err, req, res, next) => {
  if (err) {
    return res.status(401).send(err.message)
  }
  next()
})
server.express.post(server.options.endpoint, (req, res, next) => getUser(req, res, next, db))
server.start(() => {
  console.log('Server is running on http://localhost:4000')
})

