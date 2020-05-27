const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Meals = mongoose.model('meal', new mongoose.Schema({ 
    name: String,
    desc: String,}))// modelo de platillos o comida con nombre y descripción

module.exports = Meals


