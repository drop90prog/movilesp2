const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    iduser: String,
    chapterid: String,
    indexactive: Number,

})


module.exports = mongoose.model('indexactive', UserSchema)