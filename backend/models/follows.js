const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    iduser: String,
    idmanga: String,    
})

module.exports = mongoose.model('follows', UserSchema)
