const express = require('express')
const mongoose = require('mongoose')
const meals = require('./routes/meals')
const orders = require('./routes/orders')
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/api/meals', meals) // con use le estoy indicando que utilice el router o ruta de meals
app.use('/api/orders', orders)// con use le estoy indicando que utilice el router o ruta de orders

module.exports = app