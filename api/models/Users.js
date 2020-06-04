const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Users = mongoose.model('User', new Schema({ 
    email: String,
    password: String,
    salt: String,
    role: { type: String, default: 'user'}// admin
}))// modelo de users con email, password y salt que es string que se utiliza para encritar la contraseña

module.exports = Users