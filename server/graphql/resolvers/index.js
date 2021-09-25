const postResolvers = require('./posts')
const userResolvers = require('./user')
const bookmarkResolvers = require('./bookmark')
const placeResolvers = require('./place')
const placeQnAResolvers = require('./placeQna')

const resolvers = {
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query,
        ...bookmarkResolvers.Query,
        ...placeResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...placeQnAResolvers.Mutation
    }
}

module.exports = resolvers