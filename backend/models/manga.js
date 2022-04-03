const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    poster: String,
    creatorid: String,

})


module.exports = mongoose.model('manga', UserSchema)