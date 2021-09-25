const PlaceQnA = require('../../models/PlaceQna')
const PlaceAns = require('../../models/PlaceAns')

const resolvers = {
    Mutation: {
        async placeQ(_,{placeQnAInput:{placeID, authorID, authorName, body}}) {
            const newQnA = new PlaceQnA({
                placeID,
                authorID,
                authorName,
                body
            })
            const res = await newQnA.save()
            return {
                ...res._doc,
                id:res._id
            }
        },
        async placeAns(_,{placeQnAInput:{placeID, authorID, authorName, body}}) {
            const newAns = new PlaceAns({
                placeID,
                authorID,
                authorName,
                body
            })
            const res = await newAns.save()
            return {
                ...res._doc,
                id:res._id
            }
        }
    }
}

module.exports = resolvers