const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    mangaid: String,
    chaptername: String,
    number: Number,

})


module.exports = mongoose.model('chapters', UserSchema)