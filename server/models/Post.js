const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    body: String
})

module.exports = model('Post', postSchema)