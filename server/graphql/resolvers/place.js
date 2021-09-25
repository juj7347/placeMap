const Place = require('../../models/Place')

const resolvers = {
    Query: {
        async getPlace(_,{placeID}) {
            try {
                const place = await Place.find({placeID: placeID})
                return place
            } catch (err) {
                throw new Error(err)
            }
        },
        async getAllPlace() {
            try {
                const place = await Place.find()
                return place
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}

module.exports = resolvers