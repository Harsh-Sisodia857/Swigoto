const Restaurant = require('../models/Restaurant');

const createRestaurant = async (req, res) => {
    try {
        const { name, address, rating } = req.body;
        const newRestaurant = new Restaurant({ name, address, rating });
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json({
            success : true,
            savedRestaurant
        });
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
            return res.status(404).json({
                success: false,
                error: 'Restaurant not found'
            });
        }
        res.json({
            success : true,
            deletedRestaurant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
const getAllRestaurant = async (req, res) => {
    try {
        const data = await Restaurant.find();
        console.log("Data : ",data);
        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Error retrieving all restaurants:', error);
        res.status(500).json({ error: error });
    }
};

const getRestaurantByName = async (req, res, next) => {
    try {
        const { name } = req.body;
        const restaurantName = new RegExp(name,'i')
        const data = await Restaurant.find({
            name: restaurantName
        });
        console.log("Data : ",data);
        if (data.length > 0) {
            return res.status(200).json({
                success: true,
                data
            });
        } else {
            return res.status(200).json({
                success: false,
                message : "Restaurant With Given Name Does not Exist In Database"
            });
        }
        
    } catch (error) {
        console.error('Error retrieving all restaurants:', error);
        res.status(500).json({ error: error });
    }
}

module.exports = {
    createRestaurant,
    getDishesByRestaurant,
    getRestaurantById,
    deleteRestaurant,
    getAllRestaurant,
    getRestaurantByName
};
