const {model, Schema} = require('mongoose')

const placeQnASchema = new Schema({
    placeID: String,
    objectID: String,
    authorID: String,
    authorName: String,
    body: String
})

module.exports = model('PlaceQnA', placeQnASchema)