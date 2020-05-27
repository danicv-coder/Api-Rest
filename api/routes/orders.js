const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Bienvenido a ordenes')
})

module.exports = router