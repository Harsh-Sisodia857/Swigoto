const Restaurant = require('../models/Restaurant');

const createRestaurant = async (req, res) => {
    try {
        const { name, address, dishes } = req.body;
        const newRestaurant = new Restaurant({ name, address, dishes });
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(savedRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDishesByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(restaurant.dishes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
        if (!deletedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(deletedRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRestaurant,
    getDishesByRestaurant,
    getRestaurantById,
    deleteRestaurant,
};
