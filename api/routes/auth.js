const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const { isAuthenticated } = require('../auth')

const signToken = (_id) => {
    return jwt.sign({ _id }, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365,//expiresIn es un objeto de configuaración que le indicamos cuanto tiempo queremos que dure la llave que queremos generar.
    })
}
router.post('/register', (req, res) => {
    const { email, password } = req.body
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64')
            Users.findOne({ email }).exec()
            .then(user => {
                if(user)
                {
                    return res.send('Usuario ya existe')
                }
                Users.create({
                    email,
                    password: encryptedPassword,
                    salt: newSalt,                    
                }).then(() => {
                    res.send('Usuario creado con éxito')
                })
            })
        })
    })// randomBytes buscará bytes aleatorios criptográficamente fuertes. Los bytes criptográficamente fuertes son adecuados para necesidades de alta integridad, como la generación de claves a largo plazo.
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    Users.findOne({ email }).exec()
    .then(user => {
        if(!user)
        {
            return res.send('Usuario y/o contraseña incorrecta')
        }
        crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64')
            if(user.password === encryptedPassword)
            {
                const token = signToken(user._id)
                return res.send({ token })
            }
            return res.send('Usuario y/o contraseña incorrecta')
        })
    })
})
router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user)
})

module.exports = router //exportar el router que se acaba de crear