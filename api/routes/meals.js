const express = require('express')
const router = express.Router()
const Meals = require('../models/Meals')

router.get('/', (req, res) => {
    Meals.find()
    .exec()
    .then(x => res.status(200).send(x))// find me devolvera un objeto querey y exce me ejecuta la query
})

router.get('/:id', (req, res) => {
    Meals.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x))
})

router.post('/', (req, res) => {
    Meals.create(req.body)
    .then(x => res.status(201).send(x))
})

router.put('/:id', (req, res) => {
    Meals.findByIdAndUpdate(req.body.id, req.body)
    .then(x => res.status(204).send(x))
})

router.delete('/:id', (req, res) => {
    Meals.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router //exportar el router que se acaba de crear