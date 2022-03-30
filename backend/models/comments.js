const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    comment: String,
    iduser: String,
    avatar: String,
    chapterid: String,    
})


module.exports = mongoose.model('comments', UserSchema)