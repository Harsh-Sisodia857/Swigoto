const express = require('express');
const router = express.Router();
const { authenticated, authorizedRoles } = require('../middleware/auth');
const {
    createRestaurant,
    getDishesByRestaurant,
    getRestaurantById,
    deleteRestaurant,
    getAllRestaurant,
    getRestaurantByName,
} = require('../controller/restaurentController');

router.post('/create', authenticated, authorizedRoles('admin'), createRestaurant);
router.get('/:restaurantId/dishes', authenticated, authorizedRoles('admin'), getDishesByRestaurant);
router.get('/:restaurantId', authenticated, authorizedRoles('admin'), getRestaurantById);
router.delete('/:restaurantId', authenticated, authorizedRoles('admin'), deleteRestaurant);
router.get('/', authenticated, authorizedRoles('admin'), getAllRestaurant);
router.post('/', authenticated, authorizedRoles('admin'), getRestaurantByName);

module.exports = router;
