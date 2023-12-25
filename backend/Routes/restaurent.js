const express = require('express');
const router = express.Router();
const controller = require('../controller/restaurentController');

router.post('/create', controller.createRestaurant);
router.get('/:restaurantId/dishes', controller.getDishesByRestaurant);
router.get('/:restaurantId', controller.getRestaurantById);
router.delete('/:restaurantId', controller.deleteRestaurant);

module.exports = router;
