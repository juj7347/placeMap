const {model, Schema} = require('mongoose')

const placeAnsSchema = new Schema({
    placeID: String,
    objectID: String,
    authorID: String,
    authorName: String,
    body: String
})

module.exports = model('PlaceAns', placeAnsSchema)