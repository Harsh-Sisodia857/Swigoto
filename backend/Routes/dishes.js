const express = require('express');
const router = express.Router();
const dishController = require('../controller/DishController')

router.post('/create', dishController.createDish);
router.get('/:dishId', dishController.getDishById);
router.put('/:dishId', dishController.updateDish);
router.delete('/:dishId', dishController.deleteDish);
router.get("/", dishController.getAllDishes);

module.exports = router;