const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const meals = require('./routes/meals')
const orders = require('./routes/orders')
const auth = require('./routes/auth')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())// con la libreria cors me permite acceder a una app en el explorador web que no se encuentre en el mismo dominio

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/api/meals', meals) // con use le estoy indicando que utilice el router o ruta de meals
app.use('/api/orders', orders)// con use le estoy indicando que utilice el router o ruta de orders
app.use('/api/auth', auth)// con use le estoy indicando que utilice el router o ruta de auth

module.exports = app