const mongoose = require('mongoose')
const Orders = mongoose.model('order', new mongoose.Schema({
    meal_id: { type: Schema.types.ObjectId, ref: 'Meals' },
    user_id: String,
}))

module.exports = Orders