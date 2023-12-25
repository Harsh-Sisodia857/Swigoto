const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }], 
    rating: { type: Number, default: 0, max: 5 }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;