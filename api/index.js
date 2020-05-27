const express = require('express')
const mongoose = require('mongoose')
const plates = require('./routes/plates')
const orders = require('./routes/orders')
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/api/plates', plates) // con use le estoy indicando que utilice el router o ruta de plates
app.use('/api/orders', orders)// con use le estoy indicando que utilice el router o ruta de orders

module.exports = app