const {model, Schema} = require('mongoose')

const bookmarkSchema = new Schema({
    placeIDs: [String],
    name: String
})

module.exports = model('Bookmark', bookmarkSchema)