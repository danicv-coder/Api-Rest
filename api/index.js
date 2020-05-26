const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const Users = mongoose.model('User', new mongoose.Schema({ name: String}))//!er modelo de prueba
Users.create({ name: 'Daniel Calderón'})//se le da nombre al modelo de prueba

app.get('*', (req, res) => {
    Users.find()//busca todos lo usuarios
        .then(x => res.send(x))//se llama a res y se le paso los usuarios
})

module.exports = app