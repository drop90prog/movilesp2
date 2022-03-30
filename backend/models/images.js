const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    chapterid: String,
    url: String,

})


module.exports = mongoose.model('image', UserSchema)