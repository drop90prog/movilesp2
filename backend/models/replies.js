const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    commentid: String, //id del comentario al que se responde
    chapterid: String, //id del captiulo al cual pertenecen los replies
    iduser: String, //id del que hace reply 
    name: String, //del que hace reply
    reply: String,
})


module.exports = mongoose.model('replies', UserSchema)