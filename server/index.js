const {ApolloServer} = require('apollo-server')
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const mongoose = require('mongoose')

const { MONGODB }= require('./models')


const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose
  .connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Mongo Connected')
    return server.listen({port: 4000})
  })
  .then((res) =>  {
    console.log(`Server running at ${res.url}`)
  })


