const {model, Schema} = require('mongoose')

const placeSchema = new Schema({
    placeID: String,
    name: String,
    category: [String],
    lat: Number,
    lng: Number,
    address: String,
    url: String,
    thumbnail: String,
    reviewCount: Number,
    tel: String
})

module.exports = model('Place', placeSchema)