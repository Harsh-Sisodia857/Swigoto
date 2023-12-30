const express = require('express');
const router = express.Router();
const dishController = require('../controller/DishController')
const { authenticated, authorizedRoles } = require('../middleware/auth');

router.post('/create',authenticated, authorizedRoles('admin'), dishController.createDish);
router.get('/:dishId',authenticated, authorizedRoles('admin'), dishController.getDishById);
router.put('/:dishId',authenticated, authorizedRoles('admin'), dishController.updateDish);
router.delete('/:dishId',authenticated, authorizedRoles('admin'), dishController.deleteDish);
router.get("/", dishController.getAllDishes);

module.exports = router;