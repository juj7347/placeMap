const {model, Schema} = require('mongoose')

const bookmarkListSchema = new Schema({
    objectID: String,
    bookmarks: [String]
})

module.exports = model('BookmarkList', bookmarkListSchema)