const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Bienvenido a la plates')
})

module.exports = router //exportar el router que se acaba de crear