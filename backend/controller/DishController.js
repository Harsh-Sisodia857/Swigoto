const Restaurant = require('../models/Restaurant');
const Dish = require('../models/Dishes');
const cloudinary = require('cloudinary').v2;
const path = require('path');



async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    // when we upload a file using express file upload there was there was several key is included by express file upload module one of them was tempFilePath which indicate a temporary location in system to upload file and delete it later on after uploading to cloudinary 
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


const createDish = async (req, res) => {
    try {
        const { name, rating, price, restaurant: restaurantId } = req.body;
        console.log(req.files)
        const images = req.files?.images;
        console.log("Images : ",images)
        const dish = { name, rating, price, restaurant: restaurantId };
        if (images) {
            const response = await uploadFileToCloudinary(images, "Dishes");
            console.log("Response:", response);
            dish.images = response.secure_url;
        }

        // Validate the incoming data
        if (!name || !price) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        
        const newDish = new Dish(dish);
        const savedDish = await newDish.save();

    
        res.status(201).json(savedDish);
    } catch (error) {
        console.error('Error in createDish:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getDishById = async (req, res) => {
    try {
        const { dishId } = req.params;
        const dish = await Dish.findById(dishId);
        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }
        res.json(dish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDish = async (req, res) => {
    try {
        const { dishId } = req.params;
        const { name, rating, price } = req.body;

        const dish = await Dish.findByIdAndUpdate(
            dishId,
            { name, rating, price },
            { new: true, runValidators: true }
        );

        if (!dish) {
            return res.status(404).json({ error: 'Dish not found' });
        }

        res.json(dish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDish = async (req, res) => {
    try {
        const { dishId } = req.params;
        const deletedDish = await Dish.findByIdAndDelete(dishId);
        if (!deletedDish) {
            return res.status(404).json({ error: 'Dish not found' });
        }
        res.json({
            success: true,
            message : "Deleted Successfully",
            deletedDish
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllDishes = async (req, res) => {
    try {
        let query = {};
        if (req.query.dish) {
            query.name = new RegExp(req.query.dish, 'i');
        }

        if (req.query.restaurant) {
            const matchingRestaurants = await Restaurant.find({
                name: new RegExp(req.query.restaurant, 'i')
            });

            if (matchingRestaurants.length === 0) {
                return res.status(404).json({ error: 'No matching restaurants found' });
            }

            query.restaurant = { $in: matchingRestaurants.map(restaurant => restaurant._id) };
        }

        console.log(query)
    
        const dishes = await Dish.find(query).populate('restaurant');
        return res.json({
            success: "true",
            dishes
        });
    } catch (error) {
        console.error('Error in getAllDishes:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = {
    createDish,
    getDishById,
    updateDish,
    deleteDish,
    getAllDishes
};
