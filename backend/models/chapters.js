const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    chaptername: String,

})


module.exports = mongoose.model('chapters', UserSchema)