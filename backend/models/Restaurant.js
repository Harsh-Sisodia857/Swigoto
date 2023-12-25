const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
    rating: { type: Number, default: 0 },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
